#!/bin/sh

echo "1. Fetch build from S3"
s3cmd get s3://assets-tb/pwa-ssr/build.tar.gz --force

echo "2. Extract build to folder with timestamp (*build-timestamp*)"
timestamp=`date "+%s"`;
mkdir build-$timestamp
tar -xf build.tar.gz -C build-$timestamp --strip-components 1

echo "Install node modules"
cd build-$timestamp && npm install 
cd ..

# If a folder with name *pwa-ssr* doesn't exist, create it
if [ ! -d pwa-ssr ]
then 
  mkdir pwa-ssr
fi

# Delete old copy for pwa-ssr (*pwa-ssr-old*)
rm -rf pwa-ssr-old

echo "Copy pwa-ssr to pwa-ssr-old"
cp -Rf pwa-ssr/. pwa-ssr-old

echo "Copy new content pwa-ssr"
rsync -a --delete-after build-$timestamp/ pwa-ssr

echo "Remove build.tar.gz"
rm build.tar.gz
echo "done"

echo "Remove build-$timestamp"
rm -rf build-$timestamp

echo "Reload pm2"
pm2 reload SSR