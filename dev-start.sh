#!/bin/bash

# Start the React development server
echo "Starting React development server..."
cd frontend && npm run dev &
REACT_PID=$!

# Wait a moment for React to start
sleep 3

# Start Laravel development server
echo "Starting Laravel development server..."
cd ..
php artisan serve &
LARAVEL_PID=$!

echo "React frontend running on http://localhost:3000"
echo "Laravel backend running on http://localhost:8000"
echo "Press Ctrl+C to stop both servers"

# Function to kill both processes when script is terminated
cleanup() {
    echo "Stopping servers..."
    kill $REACT_PID 2>/dev/null
    kill $LARAVEL_PID 2>/dev/null
    exit
}

# Trap Ctrl+C and call cleanup
trap cleanup INT

# Wait for both processes
wait
