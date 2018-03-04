<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostCollection;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostsController extends Controller
{
    public function get(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'with' => 'array|in:categories,images,tags,pages',
            'per_page' => 'integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ]);
        }

        $posts = Post::wherePublished(true);
        if ($request->has('with')) {
            $posts = $posts->with($request->with);
        }

        return response()->json(
            new PostCollection($posts->paginate($request->get('per_page', 15)))
        );
    }
}
