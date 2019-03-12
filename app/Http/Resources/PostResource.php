<?php

namespace App\Http\Resources;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\ImageResource;
use App\Http\Resources\PageResource;
use App\Http\Resources\TagResource;
use Illuminate\Http\Resources\Json\Resource;

class PostResource extends Resource
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
            'component' => [
                'element_name' => 'page',
            ],
            'images' => ImageResource::collection($this->whenLoaded('images')),
            'category' => new CategoryResource($this->whenLoaded('category')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'pages' => PageResource::collection($this->whenLoaded('pages')),
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
