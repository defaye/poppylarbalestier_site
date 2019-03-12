<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Page extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'name',
        'body',
        'body_prefix',
        'body_suffix',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'component_id' => 'integer',
        'published' => 'boolean',
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [
        'component',
    ];

    /**
     * The relationship counts that should be eager loaded on every query.
     *
     * @var array
     */
    protected $withCount = [
        // 'posts',
    ];

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        static::saving(function ($model) {
            if (!isset($model->title)) {
                $model->title = $model->name;
            }
            $model->slug = Str::slug($model->title);
        });

        parent::boot();
    }

    /**
     * Get all of the images for this page.
     */
    public function images()
    {
        return $this->morphToMany('App\Image', 'imageable')->withPivot('position')->orderBy('position');
    }

    /**
     * Get all of the posts of this page.
     */
    public function posts()
    {
        return $this->belongsToMany('App\Post')->withPivot('order');
    }

    /**
     * Get the navigation item this page belongs to.
     */
    public function navigation()
    {
        return $this->hasOne('App\Navigation');
    }

    /**
     * Get the component this page belongs to.
     */
    public function component()
    {
        return $this->belongsTo('App\Component');
    }
}
