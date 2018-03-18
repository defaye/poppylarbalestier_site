<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Post;

class PostsController extends Controller
{
    public function index()
    {
        $posts = Post::with('category')->paginate(15);

        return view('admin.posts.index', compact('posts'));
    }

    public function create()
    {
        return view('admin.posts.create');
    }

    public function show($post)
    {
        return view('admin.posts.create');
    }

    public function edit(Request $request)
    {
        return view('admin.posts.create');
    }
}
