<?php

namespace App\Http\Controllers\Admin\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SearchController extends Controller
{
    public function posts(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required_without_all:body,category|max:255',
            'body' => 'required_without_all:title,category|max:255',
            'category' => 'required_without_all:title,body|max:255',
        ]);

        $posts = Post::with('category')->orderBy('updated_at', 'desc');

        if ($request->get('title') != false) {
            $posts = $posts->where('title', 'like', $request->title);
        }

        if ($request->get('body') != false) {
            $posts = $posts->where('body', 'like', $request->body);
        }

        if ($request->get('category') != false) {
            $posts = $posts
                ->join('categories', 'categories.id', '=', 'posts.category_id')
                ->where('categories.name', 'like', $request->category)
                ->select('posts.*');
        }

        return response()->json(PostResource::collection($posts->get()));
    }
}
