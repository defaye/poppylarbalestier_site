<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostCollection;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoriesController extends Controller
{
    public function get(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'with' => 'array|in:category,images,pages,tags',
            'name' => 'required_without:category_id|string|max:255',
            'category_id' => 'required_without:name|integer|min:1',
            // 'category_id' => 'required_without:name|integer|exists:categories,id',
            'page' => 'integer|min:1',
            'per_page' => 'integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ]);
        }

        $posts = Post::query();

        if ($request->has('name')) {
            $posts = $posts->join('categories', 'categories.id', '=', 'posts.category_id')
                ->where('categories.name', $request->name)
                ->select('posts.*');
        } elseif ($request->has('category_id')) {
            $posts = $posts->whereCategoryId($request->category_id);
        }
        if ($request->has('with')) {
            $posts = $posts->with($request->with);
        }
        if ($request->has('page')) {
            $perPage = $request->get('per_page', 1);
            $posts = $posts->skip($request->page * $perPage - $perPage)
                ->paginate($perPage);
        } else {
            $posts = $posts->get();
        }

        return response()->json(
            new PostCollection($posts)
        );
    }
}
