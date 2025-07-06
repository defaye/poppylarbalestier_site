#!/bin/bash

echo "Building static version of Poppy Larbalestier Photography..."

# Clean previous build
rm -rf ./dist

# Build assets
echo "Building CSS and JS assets..."
npm run production

# Generate static site
echo "Generating static site files..."
php artisan site:generate --output=./dist

# Copy built assets to dist
echo "Copying built assets..."
cp -r ./public/css ./dist/css
cp -r ./public/js ./dist/js
cp -r ./public/mix-manifest.json ./dist/mix-manifest.json

# Generate navigation data
echo "Generating navigation data..."
mkdir -p ./dist/api
php -r "
require_once 'vendor/autoload.php';
\$app = require_once 'bootstrap/app.php';
\$kernel = \$app->make(Illuminate\Contracts\Console\Kernel::class);
\$kernel->bootstrap();

\$pages = App\Page::join('navigations', 'pages.id', '=', 'navigations.page_id')
    ->orderBy('position')
    ->select('pages.*')
    ->where('pages.published', true)
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
echo 'Navigation data generated.';
"

# Create .nojekyll file for GitHub Pages
echo "Creating .nojekyll file..."
touch ./dist/.nojekyll

# Create CNAME file if needed (uncomment and modify for custom domain)
# echo "yourdomain.com" > ./dist/CNAME

echo "Static site generated successfully in ./dist/"
echo "You can now upload the ./dist/ directory to any static hosting service."
