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
    public function paginate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'with' => 'array|in:component,images,posts',
            'per_page' => 'integer|min:1',
            'page' => 'integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ]);
        }

        $perPage = $request->get('per_page', 15);
        $pages = Page::skip($request->get('page', 1 * $perPage - $perPage));
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
            'body' => 'required|string',
            'component_id' => 'required|exists:components,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ], 422);
        }

        $page = new Page($request->only([
            'title', 'name', 'body',
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
            'body' => 'required|string',
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

        $page = Page::with('component', 'images')->find($request->id);
        $page->fill($request->only([
            'title',
            'name',
            'body',
            'published',
        ]));
        $page->component()->associate($request->component_id);
        $posts = Post::whereIn('id', array_map(function ($post) {
            return (int) $post['id'];
        }, $request->get('posts', [])))->get();
        $page->posts()->sync($posts);
        $page->published = $request->published;
        $page->save();

        return response()->json(new PageResource($page->load('posts.category')));
    }
}
