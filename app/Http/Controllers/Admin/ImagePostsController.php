<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ImageResource;
use App\Image;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImagePostsController extends Controller
{
    public function create(Request $request, $post)
    {
        $validator = Validator::make($request->all(), [
            'images' => 'required|array',
            'images.*' => 'required|file|mimetypes:image/png,image/jpeg',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ]);
        }

        if (!($post = Post::find($post))) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $images = [];
        for ($i = 0; $i < count($request->images); $i++) {
            $images[] = Image::save($request->file("images.$i"));
        }
        $post->images()->saveMany($images);

        return response()->json(ImageResource::collection($images));
    }
}
