<?php

namespace App\Http\Controllers\Admin\API;

use App\Http\Controllers\Controller;
use App\Image;

class ImagesController extends Controller
{
    public function delete($image)
    {
        if (!($image = Image::find($image))) {
            return response()->json(['message' => 'Image not found'], 404);
        }
        if ($image->delete()) {
            return response()->json(true);
        }

        return response()->json(['message' => 'The image could not be deleted'], 500);
    }
}
