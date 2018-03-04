<?php

namespace App\Http\Controllers;

use App\Http\Resources\PageCollection;
use App\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PagesController extends Controller
{
    public function get(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'with' => 'array|in:images,posts',
            'per_page' => 'integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ]);
        }

        $pages = Page::wherePublished(true);
        if ($request->has('with')) {
            $pages = $pages->with($request->with);
        }

        return response()->json(
            new PageCollection($pages->paginate($request->get('per_page', 15)))
        );
    }
}
