#!/bin/bash

echo "Testing static site generation..."

# Set up test environment
cp .env.example .env.testing
echo "APP_ENV=testing" >> .env.testing
echo "DB_CONNECTION=sqlite" >> .env.testing
echo "DB_DATABASE=:memory:" >> .env.testing

# Run a quick test
php artisan config:cache --env=testing
php artisan migrate --env=testing --force

# Check if pages exist
echo "Checking if pages exist in database..."
php artisan tinker --execute="
\$pageCount = App\Page::count();
echo 'Pages in database: ' . \$pageCount . PHP_EOL;

if (\$pageCount === 0) {
    echo 'No pages found. Please seed your database first.' . PHP_EOL;
    exit(1);
}

\$publishedPages = App\Page::where('published', true)->count();
echo 'Published pages: ' . \$publishedPages . PHP_EOL;

if (\$publishedPages === 0) {
    echo 'No published pages found. Please ensure you have published pages.' . PHP_EOL;
    exit(1);
}

echo 'Database check passed!' . PHP_EOL;
"

# Test the generation command
echo "Testing static site generation command..."
php artisan site:generate --output=./test-dist --env=testing

if [ $? -eq 0 ]; then
    echo "✅ Static site generation successful!"
    echo "Generated files:"
    ls -la ./test-dist/
    
    # Clean up test files
    rm -rf ./test-dist
    rm .env.testing
    
    echo "Test completed successfully!"
else
    echo "❌ Static site generation failed!"
    rm -rf ./test-dist
    rm .env.testing
    exit 1
fi
