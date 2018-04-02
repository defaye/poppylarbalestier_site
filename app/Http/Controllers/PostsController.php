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
            'with' => 'array|in:category,images,tags,pages',
            'per_page' => 'integer|min:1',
            'page' => 'integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ]);
        }

        $perPage = $request->get('per_page', 15);
        $posts = Post::wherePublished(true)->skip($request->get('page', 1 * $perPage - $perPage));
        if ($request->has('with')) {
            $posts = $posts->with($request->with);
        }

        return response()->json(
            new PostCollection($posts->paginate($perPage))
        );
    }
}
