#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

# Copy built files to web directory
echo "Copying files to web directory..."
cp -r dist/* /var/www/html/

# Set proper permissions
echo "Setting permissions..."
chown -R www-data:www-data /var/www/html/
chmod -R 755 /var/www/html/

# Restart nginx
echo "Restarting nginx..."
systemctl restart nginx

echo "Deployment complete!"
