<?php

namespace App\Http\Controllers\Admin\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PageCollection;
use App\Http\Resources\PageResource;
use App\Page;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PagesController extends Controller
{
    /**
     * Get a complete JSON dump of all the Pages.
     *
     * @param \Illuminate\Http\Request $request
     * @return string(JSON) 
     */
    public function all(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'with' => 'array|in:component,images,posts',
            'per_page' => 'integer|min:1',
            'page' => 'integer|min:1',
        ])->validate();

        $pages = Page::when($request->has('with'), function ($query) use ($request) {
                return $query->with($request->with);
            })
            ->get();

        return response()->json(
            new PageCollection(
                $pages
            )
        );
    }

    public function paginate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'with' => 'array|in:component,images,posts',
            'per_page' => 'integer|min:1',
            'page' => 'integer|min:1',
        ])->validate();

        // if ($validator->fails()) {
        //     return response()->json(['message' => 'Invalid request',
        //         'errors' => $validator->errors(),
        //     ]);
        // }

        $perPage = $request->get('per_page', 15);
        $pages = Page::skip($request->get('page', 1) * $perPage - $perPage);
        if ($request->has('with')) {
            $pages = $pages->with($request->with);
        }

        return response()->json(
            new PageCollection($pages->paginate($perPage))
        );
    }

    public function get($page)
    {
        $page = Page::with('component', 'images', 'posts.category')->find($page);

        return response()->json(new PageResource($page));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required_without:name|nullable|max:255',
            'name' => 'required_without:title|nullable|max:255',
            'body' => 'nullable|string',
            'body_prefix' => 'nullable|string',
            'body_suffix' => 'nullable|string',
            'component_id' => 'required|exists:components,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ], 422);
        }

        $page = new Page($request->only([
            'title',
            'name',
            'body',
            'body_suffix',
            'body_prefix',
        ]));
        $page->component()->associate($request->component_id);
        $page->save();

        return response()->json(new PageResource($page));
    }

    public function update(Request $request, $page)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:pages',
            'title' => 'required_without:name|nullable|max:255',
            'name' => 'required_without:title|nullable|max:255',
            'body' => 'nullable|string',
            'body_prefix' => 'nullable|string',
            'body_suffix' => 'nullable|string',
            'component_id' => 'required|exists:components,id',
            'posts' => 'array',
            'posts.*.id' => 'required|exists:posts,id',
            'published' => 'boolean',
        ],
            [
                'component_id' => 'test',
            ],
            [
            ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ], 422);
        }
        try {

            $page = Page::with('component', 'images')->find($request->id);
            $page->fill($request->only([
                'title',
                'name',
                'body',
                'body_suffix',
                'body_prefix',
                'published',
            ]));
            $page->component()->associate($request->component_id);
            $posts = Post::whereIn('id', array_map(function ($post) {
                return (int) $post['id'];
            }, $request->get('posts', [])))->get();
            $page->posts()->sync($posts);
            $page->published = $request->published;
            $page->save();

            if ($request->has('images')) {
                foreach ($request->images as $index => $image) {
                    $page->images()->updateExistingPivot($image['id'], ['position' => $index]);
                }
            }

            return response()->json(new PageResource($page->load('posts.category')));
        } catch (\Exception $e) {
            \Log::error((string) $e);
            return response()->json([
                'message' => 'There is something wrong with the system.',
            ], 500);
        }
    }

    /**
     * Delete a page.
     * @param  integer $page ID
     * @return string       JSON response
     */
    public function delete($page)
    {
        return response()->json(Page::whereId($page)->delete());
    }
}
