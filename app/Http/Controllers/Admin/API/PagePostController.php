<?php

namespace App\Http\Controllers\Admin\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PagePostController extends Controller
{
    public function sort(Request $request)
    {
        Validator::make($request->all(), [
            'page' => [
                'required',
                'exists:page_post,page_id',
            ],
            'posts' => [
                'required',
                'array',
            ],
            'posts.*' => [
                'required',
                Rule::exists('page_post')->where(function ($query) use ($request) {
                    $query->where('page_id', $request->page)
                        ->where('post_id', $request->post);
                }),
            ],
        ]);

        foreach ($request->posts as $index => $id) {
            DB::table('page_post')
                ->wherePageId($request->page)
                ->wherePostId($id)
                ->update([
                    'order' => $index,
                ]);
        }

        return response()->json(true);
    }
}
