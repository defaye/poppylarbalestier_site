<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Page;

class PagesController extends Controller
{
    public function index()
    {
        $pages = Page::paginate(15);

        return view('admin.pages.index', compact('pages'));
    }

    public function create()
    {
        return view('admin.pages.create');
    }

    public function show($page)
    {
        return view('admin.pages.create');
    }

    public function edit(Request $request)
    {
        return view('admin.pages.create');
    }
}
