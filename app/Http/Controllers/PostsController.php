<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PostsController extends Controller
{
    public function get(Request $request)
    {
        // Simple version for React frontend - return all published posts with relationships
        if (!$request->has('with') && !$request->has('category') && !$request->has('tag')) {
            return Post::with(['images', 'category', 'tags'])
                ->where('published', true)
                ->orderBy('created_at', 'desc')
                ->get();
        }

        // Original complex logic for backward compatibility
        $validator = Validator::make($request->all(), [
            'with' => 'array|in:category,images,tags,pages',
            'category' => 'string|max:255',
            'tag' => 'string|max:255',
            'page' => 'string|max:255',
            'per_page' => 'integer|min:1',
            'page' => 'integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ]);
        }

        $perPage = $request->get('per_page', 15);
        $posts = Post::wherePublished(true)->skip($request->get('page', 1) * $perPage - $perPage);
        // if ($request->has('with')) {
        //     $posts = $posts->with([
        //         $request->with
        //     ]);
        // }
        if ($request->has('with')) {
            $withs = [];
            foreach ($request->with as $with) {

                if ($request->has('where')) {
                    $where = json_decode($request->where);
                    if (isset($where->{Str::singular($with)})) {
                        $value = $where->{Str::singular($with)};
                        $withs[$with] = function ($query) use ($value) {
                            $query->where('name', $value);
                        };
                    } else {
                        $withs[] = $with;
                    }

                }
            }
            $posts = $posts->with($withs);
        }

        return response()->json(
            \App\Http\Resources\PostResource::collection($posts->get())
            // new PostCollection($posts->paginate($perPage))
        );
    }

    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'with' => 'array|in:category,images,tags,pages',
            'category' => 'string|max:255',
            'tag' => 'string|max:255',
            'per_page' => 'integer|min:1',
            'page' => 'integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid request',
                'errors' => $validator->errors(),
            ]);
        }

        $perPage = $request->get('per_page', 15);
        $posts = Post::wherePublished(true)
        //->skip($request->get('page', 1) * $perPage - $perPage)
        ;

        if ($request->has('with')) {
            $withs = [];
            foreach ($request->with as $with) {

                if ($request->has('where')) {
                    if ($value = $request->input("where." . Str::singular($with))) {
                        $withs[$with] = function ($query) use ($value) {
                            $query->where('name', $value);
                        };
                    } else {
                        $withs[] = $with;
                    }

                }
            }
            $posts = $posts->with($withs);
        }

        return response()->json(
            \App\Http\Resources\PostResource::collection($posts->get())
            // new PostCollection($posts->paginate($perPage))
        );
    }

    public function getBySlug($slug)
    {
        $post = Post::with(['images', 'category', 'tags'])
            ->where('published', true)
            ->where('slug', $slug)
            ->first();

        if (!$post) {
            abort(404);
        }

        return $post;
    }

    /**
     * Get a post by page slug and post slug (for nested routes like /weddings/ellen-alex.json)
     */
    public function getByPageAndSlug($pageSlug, $postSlug)
    {
        $post = Post::with(['images'])
            ->whereHas('pages', function ($query) use ($pageSlug) {
                $query->where('slug', $pageSlug);
            })
            ->where('published', true)
            ->where('slug', $postSlug)
            ->first();

        if (!$post) {
            abort(404);
        }

        // Format the response to match static JSON structure
        $page = $post->pages()->where('slug', $pageSlug)->first();
        
        return [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'summary' => $post->summary,
            'body' => $post->body,
            'body_prefix' => $post->body_prefix,
            'body_suffix' => $post->body_suffix,
            'published' => $post->published,
            'page' => [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug
            ],
            'images' => $post->images->map(function ($image) {
                return [
                    'id' => $image->id,
                    'path' => $image->path,
                    'name' => $image->name
                ];
            })
        ];
    }
}
