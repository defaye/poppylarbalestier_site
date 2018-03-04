<?php

namespace App\Http\Controllers;

use App\Http\Resources\ImageCollection;
use App\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImagesController extends Controller
{
    public function get(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'with' => 'array|in:posts,pages',
            'per_page' => 'integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ]);
        }

        $images = Image::query();
        if ($request->has('with')) {
            $images = $images->with($request->with);
        }

        return response()->json(
            new ImageCollection($images->paginate($request->get('per_page', 15)))
        );
    }
}
