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

// Route::get('/', function () {
//     $images = array_map(function ($file) {
//         return Storage::url($file);
//     }, Storage::files('public/images/content/home'));
//     return view('welcome', compact('images'));
// });

Route::get('about', function () {
    return view('about');
});

Route::group(['middleware' => 'guest', 'prefix' => 'admin'], function () {
    Route::get('login', ['middleware' => 'guest', 'as' => 'login', 'uses' => 'Auth\LoginController@showLoginForm']);
    Route::post('login', ['middleware' => 'guest', 'uses' => 'Auth\LoginController@login']);
    Route::post('password/email', ['middleware' => 'guest', 'as' => 'password.email', 'uses' => 'Auth\ForgotPasswordController@sendResetLinkEmail']);
    Route::get('password/reset', ['middleware' => 'guest', 'as' => 'password.request', 'uses' => 'Auth\ForgotPasswordController@showLinkRequestForm']);
    Route::post('password/reset', ['middleware' => 'guest', 'uses' => 'Auth\ResetPasswordController@reset']);
    Route::get('password/reset/{token}', ['middleware' => 'guest', 'as' => 'password.reset', 'uses' => 'Auth\ResetPasswordController@showResetForm']);
    // Route::get('register', ['middleware' => 'guest', 'as' => 'register', 'uses' => 'Auth\RegisterController@showRegistrationForm']);
    // Route::post('register', ['middleware' => 'guest', 'uses' => 'Auth\RegisterController@register']);
});

Route::group(['middleware' => 'auth', 'prefix' => 'admin'], function () {
    Route::get('/', 'HomeController@index')->name('home');
    Route::post('logout', ['as' => 'logout', 'uses' => 'Auth\LoginController@logout']);

    Route::resource('posts', 'Admin\PostsController');
    // Route::get('posts', 'Admin\PostsController@index');
    // Route::get('posts/{post}', 'Admin\PostsController@edit');
    // Route::get('posts/new', 'Admin\PostsController@create');
});

Route::get('/')->uses('PagesController@page');
Route::get('{wildcard}')->uses('PagesController@page')->where('wildcard', '.+');
