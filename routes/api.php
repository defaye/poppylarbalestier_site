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

Route::group(['middleware' => 'throttle:60,1'], function () {

    Route::get('categories')->uses('CategoriesController@get');
    Route::get('images')->uses('ImagesController@get');
    Route::get('navigation')->uses('NavigationController@get');
    Route::get('pages')->uses('PagesController@get');
    // Route::post('pages')->uses('PagesController@find');

    Route::get('posts')->uses('PostsController@get');

    Route::get('tags')->uses('TagsController@get');
    Route::post('router')->uses('PagesController@router');

    // Route::middleware('auth')->group(function () {
    //     Route::get('users')->uses('UsersController@get');
    // });

    Route::group(['prefix' => 'admin', 'name' => 'admin.', 'middleware' => 'auth:api'], function () {

        Route::get('posts', 'Admin\API\PostsController@paginate');
        Route::get('posts/{post}', 'Admin\API\PostsController@get');
        Route::post('posts', 'Admin\API\PostsController@store');
        Route::patch('posts/{post}', 'Admin\API\PostsController@update');
        Route::post('posts/{post}/images', 'Admin\API\ImagePostsController@create');
        Route::delete('images/{image}', 'Admin\API\ImagesController@delete');

        Route::get('pages', 'Admin\API\PagesController@paginate');
        Route::get('pages/{page}', 'Admin\API\PagesController@get');
        Route::post('pages', 'Admin\API\PagesController@store');
        Route::patch('pages/{page}', 'Admin\API\PagesController@update');
        Route::post('pages/{page}/images', 'Admin\API\ImagePagesController@create');

        Route::get('components', 'Admin\API\ComponentsController@all');
        Route::get('components/{component}', 'Admin\API\ComponentsController@get');
        Route::post('components', 'Admin\API\ComponentsController@store');
        Route::patch('components/{component}', 'Admin\API\ComponentsController@update');

        Route::group(['prefix' => 'navigation'], function () {
            Route::get('', 'Admin\API\NavigationsController@get');
            Route::post('', 'Admin\API\NavigationsController@update');

        });

        Route::group(['prefix' => 'search'], function () {
            Route::get('posts', 'Admin\API\SearchController@posts');
        });

        // Route::get('posts')->uses('Admin\PostsController@get');
        // Route::get('posts/new')->uses('Admin\PostsController@instantiate');
        // Route::patch('posts/{id}')->uses('Admin\PostsController@save');
        // Route::post('posts/{id}/images')->uses('Admin\ImagePostsController@create');

    });
});
