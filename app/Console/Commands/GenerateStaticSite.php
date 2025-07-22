<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Page;
use App\Post;
use App\Navigation;
use App\Category;
use App\Tag;
use App\Image;

class GenerateStaticSite extends Command
{
    protected $signature = 'site:generate {--output=dist : Output directory}';
    protected $description = 'Generate a complete static version of the site';

    private $outputDir;
    private $baseUrl = '';
    private $allData = [];

    public function handle()
    {
        $this->outputDir = $this->option('output');
        
        $this->info('Starting static site generation...');
        
        // Create output directory
        if (File::exists($this->outputDir)) {
            File::deleteDirectory($this->outputDir);
        }
        File::makeDirectory($this->outputDir, 0755, true);
        
        // Load all data
        $this->loadAllData();
        
        // Copy assets
        $this->copyAssets();
        
        // Generate pages
        $this->generatePages();
        
        // Generate API data files
        $this->generateApiData();
        
        // Generate main static files
        $this->generateStaticApp();
        
        $this->info('Static site generation completed!');
    }

    private function loadAllData()
    {
        $this->info('Loading all data...');
        
        $this->allData = [
            'navigation' => Navigation::with('page')->orderBy('position')->get(),
            'pages' => Page::with(['component', 'images'])->where('published', true)->get(),
            'posts' => Post::with(['images', 'category', 'tags'])->where('published', true)->get(),
            'categories' => Category::all(),
            'tags' => Tag::all(),
            'images' => Image::all(),
        ];
        
        // Transform image paths for static site
        $this->transformImagePaths();
        
        $this->info('Data loaded successfully.');
    }

    private function copyAssets()
    {
        $this->info('Copying assets...');
        
        // Copy public assets
        $publicAssets = ['css', 'js', 'images', 'fonts'];
        foreach ($publicAssets as $asset) {
            $source = public_path($asset);
            $dest = $this->outputDir . '/' . $asset;
            if (File::exists($source)) {
                File::copyDirectory($source, $dest);
            }
        }
        
        // Copy storage images
        $storageImages = storage_path('app/public/images');
        if (File::exists($storageImages)) {
            $destImages = $this->outputDir . '/storage/images';
            if (!File::exists($destImages)) {
                File::makeDirectory($destImages, 0755, true);
            }
            File::copyDirectory($storageImages, $destImages);
        }
        
        // Copy other files
        $otherFiles = ['favicon.ico', 'robots.txt', 'mix-manifest.json'];
        foreach ($otherFiles as $file) {
            $source = public_path($file);
            $dest = $this->outputDir . '/' . $file;
            if (File::exists($source)) {
                File::copy($source, $dest);
            }
        }
        
        $this->info('Assets copied successfully.');
    }

    private function generatePages()
    {
        $this->info('Generating pages...');
        
        // Generate home page
        $this->generateHomePage();
        
        // Generate individual pages
        foreach ($this->allData['pages'] as $page) {
            $this->generatePage($page);
        }
        
        // Generate post pages
        foreach ($this->allData['posts'] as $post) {
            $this->generatePostPage($post);
        }
        
        // Generate category pages
        foreach ($this->allData['categories'] as $category) {
            $this->generateCategoryPage($category);
        }
        
        $this->info('Pages generated successfully.');
    }

    private function generateHomePage()
    {
        $homePage = $this->allData['pages']->where('slug', '')->first();
        if (!$homePage) {
            $homePage = $this->allData['pages']->first();
        }
        
        $html = $this->renderPageHtml($homePage, '/');
        File::put($this->outputDir . '/index.html', $html);
    }

    private function generatePage($page)
    {
        $path = $page->slug ? '/' . $page->slug : '/';
        $html = $this->renderPageHtml($page, $path);
        
        if ($page->slug) {
            $dir = $this->outputDir . '/' . $page->slug;
            if (!File::exists($dir)) {
                File::makeDirectory($dir, 0755, true);
            }
            File::put($dir . '/index.html', $html);
        }
    }

    private function generatePostPage($post)
    {
        $path = '/posts/' . $post->slug;
        $html = $this->renderPostHtml($post, $path);
        
        $dir = $this->outputDir . '/posts/' . $post->slug;
        if (!File::exists($dir)) {
            File::makeDirectory($dir, 0755, true);
        }
        File::put($dir . '/index.html', $html);
    }

    private function generateCategoryPage($category)
    {
        $path = '/categories/' . $category->slug;
        $posts = $this->allData['posts']->filter(function($post) use ($category) {
            return $post->category && $post->category->id === $category->id;
        });
        
        $html = $this->renderCategoryHtml($category, $posts, $path);
        
        $dir = $this->outputDir . '/categories/' . $category->slug;
        if (!File::exists($dir)) {
            File::makeDirectory($dir, 0755, true);
        }
        File::put($dir . '/index.html', $html);
    }

    private function renderPageHtml($page, $path)
    {
        $title = $page->title ? $page->title . ' — Poppy Larbalestier Photography' : 'Poppy Larbalestier Photography';
        
        // Calculate depth and base URL for asset paths
        // For pages like /weddings, the file is at /weddings/index.html, so depth should be 1
        if ($path === '/') {
            $depth = 0;
        } else {
            $depth = substr_count(trim($path, '/'), '/') + 1;
        }
        $baseUrl = $depth > 0 ? str_repeat('../', $depth) : './';
        
        return view('layouts.static', [
            'title' => $title,
            'page' => $page,
            'path' => $path,
            'allData' => $this->allData,
            'type' => 'page',
            'baseUrl' => $baseUrl,
            'depth' => $depth
        ])->render();
    }

    private function renderPostHtml($post, $path)
    {
        $title = $post->title . ' — Poppy Larbalestier Photography';
        
        // Calculate depth and base URL for asset paths
        // Posts are at /posts/slug/index.html, so depth is 2
        $depth = substr_count(trim($path, '/'), '/') + 1;
        $baseUrl = $depth > 0 ? str_repeat('../', $depth) : './';
        
        return view('layouts.static', [
            'title' => $title,
            'page' => $post,
            'path' => $path,
            'allData' => $this->allData,
            'type' => 'post',
            'baseUrl' => $baseUrl,
            'depth' => $depth
        ])->render();
    }

    private function renderCategoryHtml($category, $posts, $path)
    {
        $title = $category->name . ' — Poppy Larbalestier Photography';
        
        // Calculate depth and base URL for asset paths
        // Categories are at /categories/slug/index.html, so depth is 2
        $depth = substr_count(trim($path, '/'), '/') + 1;
        $baseUrl = $depth > 0 ? str_repeat('../', $depth) : './';
        
        return view('layouts.static', [
            'title' => $title,
            'page' => $category,
            'posts' => $posts,
            'path' => $path,
            'allData' => $this->allData,
            'type' => 'category',
            'baseUrl' => $baseUrl,
            'depth' => $depth
        ])->render();
    }

    private function generateApiData()
    {
        $this->info('Generating API data...');
        
        $apiDir = $this->outputDir . '/api';
        if (!File::exists($apiDir)) {
            File::makeDirectory($apiDir, 0755, true);
        }
        
        // Generate navigation data
        File::put($apiDir . '/navigation.json', json_encode($this->allData['navigation']));
        
        // Generate pages data
        File::put($apiDir . '/pages.json', json_encode($this->allData['pages']));
        
        // Generate posts data
        File::put($apiDir . '/posts.json', json_encode($this->allData['posts']));
        
        // Generate categories data
        File::put($apiDir . '/categories.json', json_encode($this->allData['categories']));
        
        // Generate tags data
        File::put($apiDir . '/tags.json', json_encode($this->allData['tags']));
        
        // Generate router data for each page
        foreach ($this->allData['pages'] as $page) {
            $routerData = [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'content' => $page->content,
                'component' => $page->component,
                'images' => $page->images,
                'type' => 'page'
            ];
            
            $filename = $page->slug ? $page->slug : 'home';
            File::put($apiDir . '/router-' . $filename . '.json', json_encode($routerData));
        }
        
        // Generate router data for posts
        foreach ($this->allData['posts'] as $post) {
            $routerData = [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'content' => $post->body,
                'images' => $post->images,
                'category' => $post->category,
                'tags' => $post->tags,
                'type' => 'post'
            ];
            
            File::put($apiDir . '/router-post-' . $post->slug . '.json', json_encode($routerData));
        }
        
        $this->info('API data generated successfully.');
    }

    private function generateStaticApp()
    {
        $this->info('Generating static app files...');
        
        // Create a custom static JS file
        $staticJs = $this->generateStaticJavaScript();
        File::put($this->outputDir . '/js/app-static.js', $staticJs);
        
        // Create a router configuration
        $routerConfig = $this->generateRouterConfig();
        File::put($this->outputDir . '/js/router-config.js', $routerConfig);
        
        $this->info('Static app files generated successfully.');
    }

    private function generateStaticJavaScript()
    {
        return "
// Static site router for Poppy Larbalestier Photography
(function() {
    'use strict';
    
    // Router configuration
    const routes = " . json_encode($this->generateRoutes()) . ";
    
    // Simple static router
    function handleRoute() {
        const path = window.location.pathname;
        const route = routes.find(r => r.path === path) || routes.find(r => r.path === '/');
        
        if (route && route.data) {
            // Load the page data
            loadPageData(route.data);
        }
    }
    
    function loadPageData(dataFile) {
        fetch(dataFile)
            .then(response => response.json())
            .then(data => {
                // Update page content if Vue app is available
                if (window.Vue && window.app && window.app.\$store) {
                    window.app.\$store.state.page = data;
                    document.title = data.title ? data.title + ' — Poppy Larbalestier Photography' : 'Poppy Larbalestier Photography';
                }
            })
            .catch(console.error);
    }
    
    // Handle navigation
    function navigateToPath(path) {
        window.history.pushState({}, '', path);
        handleRoute();
    }
    
    // Override Vue router navigation
    if (window.Vue) {
        window.navigateToPath = navigateToPath;
    }
    
    // Handle back/forward buttons
    window.addEventListener('popstate', handleRoute);
    
    // Handle initial load
    document.addEventListener('DOMContentLoaded', handleRoute);
})();
";
    }

    private function generateRouterConfig()
    {
        $routes = $this->generateRoutes();
        
        return "window.STATIC_ROUTES = " . json_encode($routes) . ";";
    }

    private function generateRoutes()
    {
        $routes = [];
        
        // Add home route
        $routes[] = [
            'path' => '/',
            'data' => '/api/router-home.json'
        ];
        
        // Add page routes
        foreach ($this->allData['pages'] as $page) {
            if ($page->slug) {
                $routes[] = [
                    'path' => '/' . $page->slug,
                    'data' => '/api/router-' . $page->slug . '.json'
                ];
            }
        }
        
        // Add post routes
        foreach ($this->allData['posts'] as $post) {
            $routes[] = [
                'path' => '/posts/' . $post->slug,
                'data' => '/api/router-post-' . $post->slug . '.json'
            ];
        }
        
        return $routes;
    }
    
    private function transformImagePaths()
    {
        $this->info('Transforming image paths for static site...');
        
        // Transform all image objects to use static paths
        $this->allData['images'] = $this->allData['images']->map(function($image) {
            $image->path = './storage/images/' . $image->filename;
            return $image;
        });
        
        // Transform image paths in pages
        foreach ($this->allData['pages'] as $page) {
            if ($page->images) {
                $page->images = $page->images->map(function($image) {
                    $image->path = './storage/images/' . $image->filename;
                    return $image;
                });
            }
        }
        
        // Transform image paths in posts
        foreach ($this->allData['posts'] as $post) {
            if ($post->images) {
                $post->images = $post->images->map(function($image) {
                    $image->path = './storage/images/' . $image->filename;
                    return $image;
                });
            }
        }
        
        $this->info('Image paths transformed successfully.');
    }
}
