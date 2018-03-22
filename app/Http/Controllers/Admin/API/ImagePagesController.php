<?php

namespace App\Http\Controllers\Admin\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ImageResource;
use App\Image;
use App\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImagePagesController extends Controller
{
    public function create(Request $request, $page)
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

        if (!($page = Page::find($page))) {
            return response()->json(['message' => 'Page not found'], 404);
        }

        $images = [];
        for ($i = 0; $i < count($request->images); $i++) {
            $images[] = Image::createFromUploadedFile($request->file("images.$i"));
        }
        $page->images()->saveMany($images);

        return response()->json(ImageResource::collection(collect($images)));
    }
}
