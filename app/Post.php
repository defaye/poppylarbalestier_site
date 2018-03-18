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
        'published',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'published' => 'boolean',
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [];

    /**
     * The relationship counts that should be eager loaded on every query.
     *
     * @var array
     */
    protected $withCount = [
        // 'tags',
    ];

    /**
     * Get all of the images for the post.
     */
    public function images()
    {
        return $this->morphToMany('App\Image', 'imageable');
    }

    /**
     * Get the category this post belongs to.
     */
    public function category()
    {
        return $this->belongsTo('App\Category');
    }

    /**
     * Get all of the tags of this post.
     */
    public function tags()
    {
        return $this->belongsToMany('App\Tag');
    }

    /**
     * Get all of the pages of this post.
     */
    public function pages()
    {
        return $this->belongsToMany('App\Page');
    }
}
