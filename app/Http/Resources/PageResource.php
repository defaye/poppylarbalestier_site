<?php

namespace App\Http\Resources;

use App\Http\Resources\ImageResource;
use App\Http\Resources\NavigationResource;
use App\Http\Resources\PostResource;
use Illuminate\Http\Resources\Json\Resource;

class PageResource extends Resource
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
            'title' => $this->title,
            'name' => $this->name,
            'body' => $this->body,
            'images' => ImageResource::collection($this->whenLoaded('images')),
            'navigation' => new NavigationResource($this->whenLoaded('navigation')),
            'posts' => PostResource::collection($this->whenLoaded('posts')),
            'published' => $this->published,
            'slug' => $this->slug,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
