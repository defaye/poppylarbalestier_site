<?php

namespace App\Http\Controllers\Admin\API;

use App\Component;
use App\Http\Controllers\Controller;
use App\Http\Resources\ComponentResource;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ComponentsController extends Controller
{
    public function all()
    {
        return response()->json(ComponentResource::collection(Component::all()));
    }

    public function get($component)
    {
        $component = Component::find($component);

        return response()->json($component);
    }

    public function store(Request $request)
    {
        $validator = Validator::make([
            'name' => strtolower($request->name),
            'body' => $request->body,
        ], [
            'name' => [
                'required',
                'regex:/[A-z]{1,255}/',
                'unique:components,name',
                'not_in:' . strtolower(
                    implode(',',
                        Arr::map(function ($glob) {
                            return basename($glob, '.vue');
                        }, glob(resource_path('js/dynamic_components/*.vue')))
                    )
                ),
            ],
            'body' => 'required|string',
        ],
            [
                // message
                'name.regex' => 'The :attribute must only contain letters in the range [A-z].',
            ],
            [
                // custom attributes
            ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ], 422);
        }

        $component = new Component($request->only([
            'name', 'body',
        ]));
        $component->save();

        return response()->json(new ComponentResource($component));
    }

    public function update(Request $request, $component)
    {
        $validator = Validator::make([
            'id' => $request->id,
            'name' => strtolower($request->name),
            'body' => $request->body,
        ], [
            'id' => 'required|exists:components',
            'name' => [
                'required',
                'regex:/[A-z]{1,255}/',
                Rule::unique('components')->ignore($request->id),
                'not_in:' . strtolower(
                    implode(',',
                        Arr::diff(
                            [$request->name],
                            Arr::map(function ($glob) {
                                return basename($glob, '.vue');
                            }, glob(resource_path('js/dynamic_components/*.vue')))
                        )
                    )
                ),
            ],
            'body' => 'required|string',
        ],
            [
                // message
                'name.regex' => 'The :attribute must only contain letters in the range [A-z].',
            ],
            [
                // custom attributes
            ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ], 422);
        }

        $component = Component::find($request->id);
        $component->fill($request->only([
            'name',
            'body',
        ]));
        $component->save();

        return response()->json(new ComponentResource($component));
    }
}
