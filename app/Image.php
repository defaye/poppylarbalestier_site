<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'name' => 'string',
        'size' => 'integer',
        'reference' => 'string',
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
    protected $withCount = [];

    /**
     * Get all of the posts that are assigned this image.
     */
    public function posts()
    {
        return $this->morphedByMany('App\Post', 'imageable');
    }

    /**
     * Get all of the pages that are assigned this image.
     */
    public function pages()
    {
        return $this->morphedByMany('App\Page', 'imageable');
    }

}
