<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware('throttle:60,1')->group(function () {

    Route::get('categories')->uses('CategoriesController@get');
    Route::get('images')->uses('ImagesController@get');
    Route::get('navigation')->uses('NavigationController@get');
    Route::get('pages')->uses('PagesController@get');
    Route::post('pages')->uses('PagesController@find');
    Route::get('posts')->uses('PostsController@get');
    Route::get('tags')->uses('TagsController@get');
    Route::post('router')->uses('PagesController@router');

    // Route::middleware('auth')->group(function () {
    //     Route::get('users')->uses('UsersController@get');
    // });

});
