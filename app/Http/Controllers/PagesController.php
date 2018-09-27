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
            $response = Page::wherePublished(true)->whereSlug($segments[0])->first()->posts()->with([
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
