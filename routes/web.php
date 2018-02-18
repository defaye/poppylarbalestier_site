<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', function () {
    $images = array_map(function ($file) {
        return Storage::url($file);
    }, Storage::files('public/images/content/home'));
    return view('welcome', compact('images'));
});

Route::get('about', function () {
    return view('about');
});

Route::get('carousel', function () {
    $images = array_map(function ($file) {
        return Storage::url($file);
    }, Storage::files('public/images/content/home'));
    return view('carousel', compact('images'));
});
