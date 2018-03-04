<?php

namespace App\Http\Resources;

use App\Http\Resources\NavigationResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class NavigationCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return NavigationResource::collection($this->collection);
    }
}
