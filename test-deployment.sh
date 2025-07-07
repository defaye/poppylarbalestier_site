#!/bin/bash

echo "Testing deployment of Poppy Larbalestier Photography site..."
echo "=========================================================="

# Test that the site is accessible
echo "Testing site accessibility..."
curl -s -o /dev/null -w "%{http_code}" https://defaye.github.io/poppylarbalestier-site/ > /tmp/http_code.txt
HTTP_CODE=$(cat /tmp/http_code.txt)

if [ "$HTTP_CODE" == "200" ]; then
    echo "✅ Site is accessible (HTTP $HTTP_CODE)"
else
    echo "❌ Site is not accessible (HTTP $HTTP_CODE)"
    exit 1
fi

# Test that assets are loading correctly
echo "Testing asset loading..."
curl -s -o /dev/null -w "%{http_code}" https://defaye.github.io/poppylarbalestier-site/assets/index-C36p4y8r.css > /tmp/css_code.txt
CSS_CODE=$(cat /tmp/css_code.txt)

if [ "$CSS_CODE" == "200" ]; then
    echo "✅ CSS assets are loading correctly (HTTP $CSS_CODE)"
else
    echo "❌ CSS assets are not loading (HTTP $CSS_CODE)"
fi

# Test that API data is accessible
echo "Testing API data accessibility..."
curl -s -o /dev/null -w "%{http_code}" https://defaye.github.io/poppylarbalestier-site/api/navigation.json > /tmp/api_code.txt
API_CODE=$(cat /tmp/api_code.txt)

if [ "$API_CODE" == "200" ]; then
    echo "✅ API data is accessible (HTTP $API_CODE)"
else
    echo "❌ API data is not accessible (HTTP $API_CODE)"
fi

# Test that storage/images are accessible
echo "Testing storage/images accessibility..."
curl -s -I https://defaye.github.io/poppylarbalestier-site/storage/images/ > /tmp/storage_response.txt
STORAGE_CODE=$(grep "HTTP" /tmp/storage_response.txt | awk '{print $2}')

if [ "$STORAGE_CODE" == "200" ] || [ "$STORAGE_CODE" == "403" ]; then
    echo "✅ Storage directory is accessible (HTTP $STORAGE_CODE)"
else
    echo "❌ Storage directory is not accessible (HTTP $STORAGE_CODE)"
fi

# Check that no storage/storage duplication exists
echo "Testing for storage duplication..."
curl -s -I https://defaye.github.io/poppylarbalestier-site/storage/storage/ > /tmp/dup_response.txt
DUP_CODE=$(grep "HTTP" /tmp/dup_response.txt | awk '{print $2}')

if [ "$DUP_CODE" == "404" ]; then
    echo "✅ No storage duplication detected (HTTP $DUP_CODE)"
else
    echo "❌ Storage duplication may exist (HTTP $DUP_CODE)"
fi

echo "=========================================================="
echo "Deployment test completed!"

# Cleanup
rm -f /tmp/http_code.txt /tmp/css_code.txt /tmp/api_code.txt /tmp/storage_response.txt /tmp/dup_response.txt
