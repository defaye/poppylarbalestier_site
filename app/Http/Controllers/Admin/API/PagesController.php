<?php

namespace App\Http\Controllers\Admin\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PageResource;
use App\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PagesController extends Controller
{
    public function get($page)
    {
        $page = Page::with('images')->find($page);

        return response()->json(new PageResource($page));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ], 422);
        }

        $page = Page::create($request->only([
            'name', 'body',
        ]));

        return response()->json(new PageResource($page));
    }

    public function update(Request $request, $page)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:posts',
            'name' => 'required|string|max:255',
            'body' => 'required|string',
            'published' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ], 422);
        }

        $page = Page::with('images')->find($request->id);
        $page->fill($request->only([
            'name',
            'body',
            'published',
        ]));
        $page->published = $request->published;
        $page->save();

        return response()->json(new PageResource($page));
    }
}
