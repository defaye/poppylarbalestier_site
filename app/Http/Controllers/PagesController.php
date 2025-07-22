<?php

namespace App\Http\Controllers;

use App\Http\Resources\PageCollection;
use App\Http\Resources\PageResource;
use App\Http\Resources\PostResource;
use App\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PagesController extends Controller
{
    public function page(Request $request)
    {
        return view('page');
    }

    public function router(Request $request)
    {
        if (!$request->has('path')) {
            return response()->json(['message' => 'Not found'], 404);
        }

        if ($request->path === '/') {
            $page = Page::join('navigations', 'pages.id', '=', 'navigations.page_id')
                ->orderBy('position')
                ->select('pages.*')
                ->where('pages.published', true)
                ->first();

            if ($page) {
                return response()->json(new PageResource($page->load('images', 'posts.images')));
            }
            return response()->json(new PageResource(new Page([
                'name' => 'Whoops!',
                'body' => 'Sorry, I could not find the page you were looking for.',
            ])));

        }

        $segments = explode('/', trim($request->path, '/'));

        $validator = Validator::make(['segments' => $segments], [
            'segments.0' => 'required|string|max:255|exists:pages,slug',
            'segments.1' => 'string|max:255|exists:posts,slug',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ]);
        }

        if (isset($segments[1])) {
            $response = Page::wherePublished(true)->whereSlug($segments[0])->first()->posts()
                ->where('published', true)
                ->with([
                    'category',
                    'images' => function ($query) {
                        $query->orderBy('name');
                    },
                    'pages',
                    // 'pages' => function ($query) use ($segments) {
                    //     $query->whereSlug($segments[1]);
                    // },
                    'tags',
                ])
            // ->with('category', 'images', 'tags')
                ->whereSlug($segments[1])->first();
            // $response = Post::with([
            //     'category',
            //     'images',
            //     'pages' => function ($query) use ($segments) {
            //         $query->whereSlug($segments[1]);
            //     },
            //     'tags',
            // ])->with('category', 'images', 'tags')->whereSlug($segments[1])->first();

            return response()->json(new PostResource($response));
        }
        $response = Page::with('images', 'posts.images')->wherePublished(true)->whereSlug($segments[0])->first();

        return response()->json(new PageResource($response));
    }

    public function get(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'with' => 'array|in:images,posts',
            'per_page' => 'integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ]);
        }

        $pages = Page::wherePublished(true);
        if ($request->has('with')) {
            $pages = $pages->with($request->with);
        }

        return response()->json(
            new PageCollection($pages->paginate($request->get('per_page', 15)))
        );
    }

    public function getAll()
    {
        return Page::with(['component', 'images'])
            ->where('published', true)
            ->orderBy('title')
            ->get();
    }

    public function getHome()
    {
        $homePage = Page::with(['component', 'images', 'posts.images'])
            ->where('published', true)
            ->whereIn('slug', ['', 'home'])
            ->first();

        if (!$homePage) {
            $homePage = Page::with(['component', 'images', 'posts.images'])
                ->where('published', true)
                ->first();
        }

        if (!$homePage) {
            abort(404);
        }

        // Format to match static JSON structure
        return [
            'id' => $homePage->id,
            'title' => $homePage->title,
            'name' => $homePage->name,
            'slug' => 'home', // Always return 'home' for consistency
            'summary' => $homePage->summary,
            'body' => $homePage->body,
            'body_prefix' => $homePage->body_prefix,
            'body_suffix' => $homePage->body_suffix,
            'published' => $homePage->published,
            'posts' => $homePage->posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'summary' => $post->summary,
                    'body' => $post->body,
                    'body_prefix' => $post->body_prefix,
                    'body_suffix' => $post->body_suffix,
                    'images' => $post->images->map(function ($image) {
                        return [
                            'id' => $image->id,
                            'path' => $image->path,
                            'name' => $image->name
                        ];
                    })
                ];
            }),
            'images' => $homePage->images->map(function ($image) {
                return [
                    'id' => $image->id,
                    'path' => $image->path,
                    'name' => $image->name
                ];
            })
        ];
    }

    public function getBySlug($slug)
    {
        $page = Page::with(['component', 'images', 'posts.images'])
            ->where('published', true)
            ->where('slug', $slug)
            ->first();

        if (!$page) {
            abort(404);
        }

        // Format to match static JSON structure
        return [
            'id' => $page->id,
            'title' => $page->title,
            'name' => $page->name,
            'slug' => $page->slug,
            'summary' => $page->summary,
            'body' => $page->body,
            'body_prefix' => $page->body_prefix,
            'body_suffix' => $page->body_suffix,
            'published' => $page->published,
            'posts' => $page->posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'summary' => $post->summary,
                    'body' => $post->body,
                    'body_prefix' => $post->body_prefix,
                    'body_suffix' => $post->body_suffix,
                    'images' => $post->images->map(function ($image) {
                        return [
                            'id' => $image->id,
                            'path' => $image->path,
                            'name' => $image->name
                        ];
                    })
                ];
            }),
            'images' => $page->images->map(function ($image) {
                return [
                    'id' => $image->id,
                    'path' => $image->path,
                    'name' => $image->name
                ];
            })
        ];
    }

    // public function find(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'id' => 'required_without_all:position,slug|integer|min:1|exists:pages,id',
    //         'position' => 'required_without_all:id,slug|integer|min:0|exists:navigations,position',
    //         'slug' => 'required_without_all:id,position|string|exists:pages,slug',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['message' => 'Invalid request',
    //             'errors' => $validator->errors(),
    //         ]);
    //     }

    //     $page = Page::join('navigations', 'navigations.page_id', '=', 'pages.id')
    //         ->with('images', 'posts')
    //         ->selectRaw('pages.*, navigations.position')
    //         ->wherePublished(true);

    //     foreach ($request->only('id', 'position', 'slug') as $where => $value) {
    //         $page = $page->where($where, $value);
    //     }

    //     $resource = new PageResource($page->first());

    //     if ($request->wantsJson()) {
    //         return response()->json(
    //             $resource
    //         );
    //     }
    //     return $resource;
    // }
}
