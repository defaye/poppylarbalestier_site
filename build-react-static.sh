#!/bin/bash

echo "Building static React version of Poppy Larbalestier Photography..."

# Clean previous build
echo "Cleaning previous build..."
rm -rf ./dist

# Build React app first
echo "Building React application..."
cd frontend
npm run build
cd ..

# Ensure Laravel server is running (check if we can reach it)
if ! curl -s http://localhost:8000/api/navigation.json > /dev/null; then
    echo "Error: Laravel server is not running on localhost:8000"
    echo "Please start the server with: php artisan serve"
    exit 1
fi

# Generate API data directly in dist (from Laravel API endpoints)
echo "Generating API data from Laravel API..."
mkdir -p ./dist/api

# Generate navigation data
echo "Fetching navigation data..."
curl -s "http://localhost:8000/api/navigation.json" > ./dist/api/navigation.json

# Generate home page data
echo "Fetching home page data..."
curl -s "http://localhost:8000/api/home.json" > ./dist/api/home.json

# Get all pages to generate their JSON files
echo "Fetching all page data..."
PAGES=$(curl -s "http://localhost:8000/api/pages/all" | jq -r '.[] | .slug' | grep -v '^home$')

for slug in $PAGES; do
    echo "Fetching data for page: $slug"
    curl -s "http://localhost:8000/api/$slug.json" > "./dist/api/$slug.json"
    
    # Generate individual post JSON files for this page
    POSTS=$(curl -s "http://localhost:8000/api/$slug.json" | jq -r '.posts[]? | "'$slug'/" + .slug')
    
    for postPath in $POSTS; do
        echo "Fetching data for post: $postPath"
        mkdir -p "./dist/api/$(dirname "$postPath")"
        curl -s "http://localhost:8000/api/$postPath.json" > "./dist/api/$postPath.json"
    done
done

# Copy storage assets
echo "Copying storage assets..."
# Remove existing storage directory to prevent duplication
rm -rf ./dist/storage
# Copy storage assets (following symlink)
cp -r ./public/storage ./dist/storage

# Fix image paths in API files to use correct base path for GitHub Pages
echo "Fixing image paths in API files..."
find ./dist/api -name "*.json" -exec perl -i -pe 's|"\\/storage\\/|"\\/poppylarbalestier-site\\/storage\\/|g' {} \;

# Create .nojekyll file for GitHub Pages
echo "Creating .nojekyll file..."
touch ./dist/.nojekyll

# Create CNAME file if needed (uncomment and modify for custom domain)
# echo "yourdomain.com" > ./dist/CNAME

echo "Static React site generated successfully in ./dist/"
echo "You can now upload the ./dist/ directory to any static hosting service."
