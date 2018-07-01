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
            'with' => 'array|in:category,images,tags,pages',
            'category' => 'string|max:255',
            'tag' => 'string|max:255',
            'page' => 'string|max:255',
            'per_page' => 'integer|min:1',
            'page' => 'integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ]);
        }

        $perPage = $request->get('per_page', 15);
        $posts = Post::wherePublished(true)->skip($request->get('page', 1) * $perPage - $perPage);
        // if ($request->has('with')) {
        //     $posts = $posts->with([
        //         $request->with
        //     ]);
        // }
        if ($request->has('with')) {
            $withs = [];
            foreach ($request->with as $with) {

                if ($request->has('where')) {
                    $where = json_decode($request->where);
                    if (isset($where->{str_singular($with)})) {
                        $value = $where->{str_singular($with)};
                        $withs[$with] = function ($query) use ($value) {
                            $query->where('name', $value);
                        };
                    } else {
                        $withs[] = $with;
                    }

                }
            }
            $posts = $posts->with($withs);
        }

        return response()->json(
            \App\Http\Resources\PostResource::collection($posts->get())
            // new PostCollection($posts->paginate($perPage))
        );
    }

    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'with' => 'array|in:category,images,tags,pages',
            'category' => 'string|max:255',
            'tag' => 'string|max:255',
            'per_page' => 'integer|min:1',
            'page' => 'integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ]);
        }

        $perPage = $request->get('per_page', 15);
        $posts = Post::wherePublished(true)
        //->skip($request->get('page', 1) * $perPage - $perPage)
        ;

        if ($request->has('with')) {
            $withs = [];
            foreach ($request->with as $with) {

                if ($request->has('where')) {
                    if ($value = $request->input("where." . str_singular($with))) {
                        $withs[$with] = function ($query) use ($value) {
                            $query->where('name', $value);
                        };
                    } else {
                        $withs[] = $with;
                    }

                }
            }
            $posts = $posts->with($withs);
        }

        return response()->json(
            \App\Http\Resources\PostResource::collection($posts->get())
            // new PostCollection($posts->paginate($perPage))
        );
    }
}
