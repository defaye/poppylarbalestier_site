#!/bin/bash

echo "Building React frontend for production..."

# Build the React app
cd frontend
npm run build

echo "React frontend built successfully!"
echo "Built files are in the dist/ directory"
echo "You can serve them with any static file server"
