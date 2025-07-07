#!/bin/bash

echo "Building static React version of Poppy Larbalestier Photography..."

# Clean previous build
rm -rf ./dist

# Build React app first
echo "Building React application..."
cd frontend
npm run build
cd ..

# Generate API data directly in dist (from Laravel)
echo "Generating API data..."
mkdir -p ./dist/api

# Generate navigation data
php -r "
require_once 'vendor/autoload.php';
\$app = require_once 'bootstrap/app.php';
\$kernel = \$app->make(Illuminate\Contracts\Console\Kernel::class);
\$kernel->bootstrap();

\$pages = App\Page::join('navigations', 'pages.id', '=', 'navigations.page_id')
    ->orderBy('position')
    ->select('pages.*')
    ->where('pages.published', true)
    ->where('pages.slug', '!=', 'home')
    ->get();

\$navigation = \$pages->map(function (\$page) {
    return [
        'id' => \$page->id,
        'title' => \$page->title,
        'name' => \$page->name,
        'slug' => \$page->slug,
        'href' => \$page->slug === 'home' ? '/' : '/' . \$page->slug
    ];
});

file_put_contents('./dist/api/navigation.json', json_encode(\$navigation));
echo 'Navigation data generated.\n';
"

# Generate page data
echo "Generating page data..."
php -r "
require_once 'vendor/autoload.php';
\$app = require_once 'bootstrap/app.php';
\$kernel = \$app->make(Illuminate\Contracts\Console\Kernel::class);
\$kernel->bootstrap();

\$pages = App\Page::where('published', true)->get();

foreach (\$pages as \$page) {
    \$posts = [];
    if (\$page->posts) {
        \$posts = \$page->posts->map(function (\$post) {
            return [
                'id' => \$post->id,
                'title' => \$post->title,
                'slug' => \$post->slug,
                'summary' => \$post->summary,
                'body' => \$post->body,
                'body_prefix' => \$post->body_prefix,
                'body_suffix' => \$post->body_suffix,
                'images' => \$post->images->map(function (\$image) {
                    return [
                        'id' => \$image->id,
                        'path' => \$image->path,
                        'name' => \$image->name
                    ];
                })
            ];
        });
        
        // Generate individual post JSON files
        foreach (\$page->posts as \$post) {
            \$postData = [
                'id' => \$post->id,
                'title' => \$post->title,
                'slug' => \$post->slug,
                'summary' => \$post->summary,
                'body' => \$post->body,
                'body_prefix' => \$post->body_prefix,
                'body_suffix' => \$post->body_suffix,
                'published' => true,
                'page' => [
                    'id' => \$page->id,
                    'title' => \$page->title,
                    'slug' => \$page->slug
                ],
                'images' => \$post->images->map(function (\$image) {
                    return [
                        'id' => \$image->id,
                        'path' => \$image->path,
                        'name' => \$image->name
                    ];
                })
            ];
            
            // Create directory for page if it doesn't exist
            if (!is_dir('./dist/api/' . \$page->slug)) {
                mkdir('./dist/api/' . \$page->slug, 0755, true);
            }
            
            file_put_contents('./dist/api/' . \$page->slug . '/' . \$post->slug . '.json', json_encode(\$postData));
            echo 'Generated data for post: ' . \$post->title . '\n';
        }
    }
    
    \$pageData = [
        'id' => \$page->id,
        'title' => \$page->title,
        'name' => \$page->name,
        'slug' => \$page->slug,
        'summary' => \$page->summary,
        'body' => \$page->body,
        'body_prefix' => \$page->body_prefix,
        'body_suffix' => \$page->body_suffix,
        'published' => \$page->published,
        'posts' => \$posts,
        'images' => \$page->images->map(function (\$image) {
            return [
                'id' => \$image->id,
                'path' => \$image->path,
                'name' => \$image->name
            ];
        })
    ];
    
    file_put_contents('./dist/api/' . \$page->slug . '.json', json_encode(\$pageData));
    echo 'Generated data for page: ' . \$page->title . '\n';
}
"

# Copy storage assets
echo "Copying storage assets..."
cp -r ./public/storage ./dist/storage

# Create .nojekyll file for GitHub Pages
echo "Creating .nojekyll file..."
touch ./dist/.nojekyll

# Create CNAME file if needed (uncomment and modify for custom domain)
# echo "yourdomain.com" > ./dist/CNAME

echo "Static React site generated successfully in ./dist/"
echo "You can now upload the ./dist/ directory to any static hosting service."
