<?php

namespace App\Http\Controllers\Admin\API;

use App\Http\Controllers\Controller;
use App\Navigation;
use App\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NavigationsController extends Controller
{
    public function get()
    {
        $navigation = Page::leftJoin('navigations', 'pages.id', '=', 'navigations.page_id')
            ->select('navigations.id', 'navigations.position', 'pages.name', 'pages.id as page_id')->orderBy('navigations.position')->get();

        return response()->json($navigation);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'items' => 'array',
            'items.*.id' => 'nullable|exists:navigations,id',
            'items.*.page_id' => 'required|exists:pages,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Request invalid',
                'errors' => $validator->errors()], 422);
        }

        Navigation::truncate();
        foreach ($request->items as $index => $page) {
            Navigation::forceCreate([
                'position' => $index,
                'page_id' => $page['page_id'],
            ]);
        }

        return $this->get();
    }
}
