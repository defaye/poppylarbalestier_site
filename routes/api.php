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
    Route::get('categories/{slug}')->uses('CategoriesController@getBySlug');
    Route::get('categories/{slug}/posts')->uses('CategoriesController@getPosts');
    
    Route::get('images')->uses('ImagesController@get');
    Route::get('navigation')->uses('NavigationController@get');
    Route::get('navigation.json')->uses('NavigationController@get'); // Static-compatible
    
    Route::get('pages')->uses('PagesController@get');
    Route::get('pages/all')->uses('PagesController@getAll');
    Route::get('pages/home')->uses('PagesController@getHome');
    Route::get('pages/{slug}')->uses('PagesController@getBySlug');
    
    // Static-compatible routes
    Route::get('home.json')->uses('PagesController@getHome');
    Route::get('{page}.json')->uses('PagesController@getBySlug')->where('page', '[a-z-]+');
    Route::get('{page}/{post}.json')->uses('PostsController@getByPageAndSlug')->where(['page' => '[a-z-]+', 'post' => '[a-z-]+']);
    // Route::post('pages')->uses('PagesController@find');

    Route::get('posts')->uses('PostsController@get');
    Route::get('posts/{slug}')->uses('PostsController@getBySlug');
    Route::post('posts')->uses('PostsController@search');

    Route::get('tags')->uses('TagsController@get');
    Route::post('router')->uses('PagesController@router');

    Route::post('contact')->uses('ContactController@sendMessage')->middleware('throttle:60,1');

    // Route::middleware('auth')->group(function () {
    //     Route::get('users')->uses('UsersController@get');
    // });

    Route::group(['prefix' => 'admin', 'name' => 'admin.', 'middleware' => 'auth:api'], function () {

        // Route::get('posts', 'Admin\API\PostsController@paginate');
        Route::get('posts', 'Admin\API\PostsController@all');
        Route::get('posts/{post}', 'Admin\API\PostsController@get');
        Route::post('posts', 'Admin\API\PostsController@store');
        Route::patch('posts/{post}', 'Admin\API\PostsController@update');
        Route::post('posts/{post}/images', 'Admin\API\ImagePostsController@create');
        Route::delete('images/{image}', 'Admin\API\ImagesController@delete');

        Route::delete('posts/{post}', 'Admin\API\PostsController@delete');

        // Route::patch('sort/posts', 'Admin\API\PostsController@sort');

        // Route::get('pages', 'Admin\API\PagesController@paginate');
        Route::get('pages', 'Admin\API\PagesController@all');
        Route::get('pages/{page}', 'Admin\API\PagesController@get');
        Route::post('pages', 'Admin\API\PagesController@store');
        Route::patch('pages/{page}', 'Admin\API\PagesController@update');
        Route::post('pages/{page}/images', 'Admin\API\ImagePagesController@create');

        Route::delete('pages/{page}', 'Admin\API\PagesController@delete');

        Route::patch('page_post/sort', 'Admin\API\PagePostController@sort');

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
        //
        Route::get('profile', 'Admin\API\ProfileController@get');
        Route::patch('profile', 'Admin\API\ProfileController@update');

    });
});
