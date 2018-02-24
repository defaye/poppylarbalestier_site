<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;

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
        'extension' => 'string',
        'size' => 'integer',
        'reference' => 'string',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'filename',
        'path',
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

    public function getFilenameAttribute()
    {
        return $this->extension ? "$this->reference.$this->extension" : $this->reference;
    }

    public function getPathAttribute()
    {
        return Storage::url("images/$this->filename");
    }

    public static function create(UploadedFile $file)
    {
        $reference = str_replace('-', '', Uuid::uuid4()->toString());

        $extension = $file->guessClientExtension() ?: $file->getClientOriginalExtension();
        $filename = $extension ? "$reference.$extension" : $reference;

        $file->storeAs('images', $filename);

        return parent::create([
            'name' => $file->getClientOriginalName(),
            'extension' => $extension,
            'size' => $file->getClientSize(),
            'reference' => $reference,
        ]);
    }
}
