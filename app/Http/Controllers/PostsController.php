<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostsController extends Controller
{
    public function get(Request $request)
    {
        $validator = Validator::make($request->all(), [
            //
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ]);
        }

        return response()->json(
            Post::wherePublished(true)
                ->with('category', 'tags')
                ->get([
                    'id',
                    'title',
                    'slug',
                    'body',
                    'category_id',
                    'created_at',
                    'updated_at',
                ])
        );
    }
}
