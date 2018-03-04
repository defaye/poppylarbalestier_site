<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'body',
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
        'posts',
    ];

    /**
     * Get all of the images for this page.
     */
    public function images()
    {
        return $this->morphToMany('App\Image', 'imageable');
    }

    /**
     * Get all of the posts of this page.
     */
    public function posts()
    {
        return $this->belongsToMany('App\Post');
    }

    /**
     * Get the navigation item this page belongs to.
     */
    public function navigation()
    {
        return $this->hasOne('App\Navigation');
    }
}
