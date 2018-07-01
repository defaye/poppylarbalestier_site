<?php

namespace App\Http\Resources;

use App\Http\Resources\PageResource;
use App\Http\Resources\PostResource;
use Illuminate\Http\Resources\Json\Resource;

class ImageResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'extension' => $this->extension,
            'size' => $this->size,
            'name' => $this->name,
            'filename' => $this->filename,
            'path' => $this->path,
            'pages' => PageResource::collection($this->whenLoaded('pages')),
            'posts' => PostResource::collection($this->whenLoaded('posts')),
            'position' => $this->pivot->position,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
