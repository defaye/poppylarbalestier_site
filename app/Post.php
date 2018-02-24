<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'body',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [
        'images',
    ];

    /**
     * The relationship counts that should be eager loaded on every query.
     *
     * @var array
     */
    protected $withCount = [];

    /**
     * Get all of the images for the post.
     */
    public function images()
    {
        return $this->morphToMany('App\Image', 'imageable');
    }

    /**
     * Get the category of this post.
     */
    public function category()
    {
        return $this->hasOne('App\Category');
    }

    /**
     * Get all of the tags of this post.
     */
    public function tags()
    {
        return $this->hasMany('App\Tag');
    }
}
