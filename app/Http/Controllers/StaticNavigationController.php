<?php

namespace App\Http\Controllers;

use App\Page;
use Illuminate\Http\Request;

class StaticNavigationController extends Controller
{
    public function getNavigation(Request $request)
    {
        $pages = Page::join('navigations', 'pages.id', '=', 'navigations.page_id')
            ->orderBy('position')
            ->select('pages.*')
            ->where('pages.published', true)
            ->get();

        return response()->json($pages->map(function ($page) {
            return [
                'id' => $page->id,
                'title' => $page->title,
                'name' => $page->name,
                'slug' => $page->slug,
                'href' => $page->slug === 'home' ? '/' : '/' . $page->slug
            ];
        }));
    }
}
