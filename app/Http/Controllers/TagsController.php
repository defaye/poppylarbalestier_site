<?php

namespace App\Http\Controllers;

use App\Http\Resources\TagCollection;
use App\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TagsController extends Controller
{
    public function get(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'with' => 'array|in:posts',
            'per_page' => 'integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ]);
        }

        $tags = Tag::orderBy('name');
        if ($request->has('with')) {
            $tags = $tags->with($request->with);
        }

        return response()->json(
            new TagCollection($tags->paginate($request->get('per_page', 15)))
        );
    }
}
