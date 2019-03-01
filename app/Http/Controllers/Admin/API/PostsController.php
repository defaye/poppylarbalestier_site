<?php

namespace App\Http\Controllers\Admin\API;

use App\Category;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostCollection;
use App\Http\Resources\PostResource;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PostsController extends Controller
{
    /**
     * Get a complete JSON dump of all the Posts.
     *
     * @param \Illuminate\Http\Request $request
     * @return string(JSON) 
     */
    public function all(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'with' => 'array|in:category,images,pages',
            'per_page' => 'integer|min:1',
            'page' => 'integer|min:1',
        ])->validate();

        $pages = Post::when($request->has('with'), function ($query) use ($request) {
                return $query->with($request->with);
            })
            ->get();

        return response()->json(
            new PostCollection(
                $pages
            )
        );
    }

    public function paginate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'with' => 'array|in:category,images,tags,pages',
            'per_page' => 'integer|min:1',
            'page' => 'integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ]);
        }

        $perPage = $request->get('per_page', 15);
        $posts = Post::skip($request->get('page', 1) * $perPage - $perPage);
        if ($request->has('with')) {
            $posts = $posts->with($request->with);
        }

        return response()->json(
            new PostCollection($posts->paginate($perPage))
        );
    }

    public function get($post)
    {
        $post = Post::with('category', 'images')->find($post);

        return response()->json(new PostResource($post));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'category' => 'required|array',
            'category.name' => 'required|string|max:255',
            // 'category.description' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ], 422);
        }

        $post = Post::create($request->only([
            'title', 'body',
        ]));
        $category = Category::firstOrCreate(['name' => $request->input('category.name')]);
        $post->category()->associate($category);
        $post->save();

        return response()->json(new PostResource($post));
    }

    public function update(Request $request, $post)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:posts',
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'category' => 'required|array',
            'category.name' => 'required|string|max:255',
            // 'category.description' => 'string|max:255',
            'published' => 'boolean',
            'images' => 'array',
            'images.*.id' => [
                Rule::exists('imageables', 'image_id')->where('imageable_type', Post::class),
            ],
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $post = Post::with('images')->find($request->id);
            $post->fill($request->only([
                'title',
                'body',
                'published',
            ]));
            $post->published = $request->published;
            $category = Category::firstOrCreate(['name' => $request->input('category.name')]);
            $post->category()->associate($category);
            $post->save();

            if ($request->has('images')) {
                foreach ($request->images as $index => $image) {
                    $post->images()->updateExistingPivot($image['id'], ['position' => $index]);
                }
            }

            return response()->json(new PostResource($post));
        } catch (\Exception $e) {
            \Log::error((string) $e);
            return response()->json([
                'message' => 'There is something wrong with the system.',
            ], 500);
        }
    }

    /**
     * Delete a post.
     * @param  integer $post ID
     * @return string       JSON response
     */
    public function delete($post)
    {
        return response()->json(Post::whereId($post)->delete());
    }
}
