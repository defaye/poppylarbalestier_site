<?php

namespace App\Http\Controllers\Admin\API;

use App\Category;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostsController extends Controller
{

    // public function instantiate()
    // {
    //     $post = new Post;
    //     $post->published = false;
    //     $post->save();

    //     return response()->json(new PostResource($post));
    // }

    public function get($post)
    {
        $post = Post::with('category', 'images')->find($post);

        return response()->json(new PostResource($post));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'category' => 'required|array',
            'category.name' => 'required|string|max:255',
            // 'category.description' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ], 422);
        }

        $post = Post::create($request->only([
            'title', 'body',
        ]));
        $category = Category::firstOrCreate(['name' => $request->input('category.name')]);
        $post->category()->associate($category);
        $post->save();

        return response()->json(new PostResource($post));
    }

    public function update(Request $request, $post)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:posts',
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'category' => 'required|array',
            'category.name' => 'required|string|max:255',
            // 'category.description' => 'string|max:255',
            'published' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ], 422);
        }

        $post = Post::with('images')->find($request->id);
        $post->fill($request->only([
            'title',
            'body',
            'published',
        ]));
        $post->published = $request->published;
        $category = Category::firstOrCreate(['name' => $request->input('category.name')]);
        $post->category()->associate($category);
        $post->save();

        return response()->json(new PostResource($post));
    }
}
