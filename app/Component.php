<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class Component extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
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
    protected $with = [];

    /**
     * The relationship counts that should be eager loaded on every query.
     *
     * @var array
     */
    protected $withCount = [];

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        static::saved(function ($model) {
            if (!is_dir($dir = resource_path('assets/js/dynamic_components'))) {
                mkdir($dir);
            }
            File::put(resource_path("assets/js/dynamic_components/" . studly_case($model->name) . ".vue"), $model->body);
            File::put(resource_path('assets/js/components.js'), null);
            static::each(function ($model) {
                File::append(resource_path('assets/js/components.js'), "Vue.component('" . snake_case($model->name) . "', require('./dynamic_components/" . studly_case($model->name) . ".vue'));\n");
            });
            $current = getcwd();
            chdir(base_path());
            $process = new Process(config('app.yarn_executable') . ' production');
            $process->run();
            if (!$process->isSuccessful()) {
                throw new ProcessFailedException($process);
            }
            chdir($current);
        });

        parent::boot();
    }

    /**
     * Get all of the pages of this component.
     */
    public function pages()
    {
        return $this->hasMany('App\Page');
    }

    /**
     * Get the template code.
     * @return string
     */
    public function getBodyAttribute()
    {
        $filename = studly_case($this->name);
        return File::get(resource_path("assets/js/dynamic_components/$filename.vue"));
    }
}
