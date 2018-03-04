<?php

namespace App\Http\Resources;

use App\Http\Resources\PageResource;
use Illuminate\Http\Resources\Json\Resource;

class NavigationResource extends Resource
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
            'position' => $this->position,
            'pages' => PageResource::collection($this->whenLoaded('pages')),
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
