<?php

namespace App\Http\Resources;

use App\Http\Resources\ComponentResource;
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
            'body' => with(new \Parsedown())->text($this->body),
            'body_prefix' => $this->body_prefix,
            'body_suffix' => $this->body_suffix,
            'images' => ImageResource::collection($this->whenLoaded('images')),
            'navigation' => new NavigationResource($this->whenLoaded('navigation')),
            'posts' => PostResource::collection($this->whenLoaded('posts')),
            'component' => new ComponentResource($this->whenLoaded('component')),
            'component_id' => $this->component_id,
            'published' => $this->published ? true : false,
            'slug' => $this->slug,
            'order' => $this->whenPivotLoaded('page_post', function () {
                return $this->pivot->order;
            }),
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
