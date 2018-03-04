<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Navigation extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'position',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'position' => 'integer',
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [];

    /**
     * Get the pages this navigation has.
     */
    public function pages()
    {
        return $this->hasMany('App\Page');
    }
}
