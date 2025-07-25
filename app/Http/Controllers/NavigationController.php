<?php

namespace App\Http\Controllers;

use App\Navigation;
use Illuminate\Http\Request;

class NavigationController extends Controller
{
    public function get(Request $request)
    {
        $navigation = Navigation::join('pages', 'navigations.page_id', '=', 'pages.id')
            ->select([
                'pages.id',
                'navigations.position',
                'pages.title',
                'pages.name',
                'pages.slug',
            ])
            ->where('pages.published', true)
            ->where('pages.slug', '!=', 'home')
            ->orderBy('navigations.position');

        return response()->json(
            $navigation->get()->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'name' => $item->name,
                    'slug' => $item->slug,
                    'href' => '/' . $item->slug,
                ];
            })
        );
    }
}
