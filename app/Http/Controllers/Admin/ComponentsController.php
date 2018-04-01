<?php

namespace App\Http\Controllers\Admin;

use App\Component;
use App\Http\Controllers\Controller;

class ComponentsController extends Controller
{
    public function index()
    {
        $components = Component::paginate(15);

        return view('admin.components.index', compact('components'));
    }

    public function create()
    {
        return view('admin.components.create');
    }

    public function show($component)
    {
        return view('admin.components.create');
    }

    public function edit(Request $request)
    {
        return view('admin.components.create');
    }
}
