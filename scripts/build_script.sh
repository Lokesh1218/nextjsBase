#!/bin/sh

# If a folder with name *build* doesn't exist, create it
if [ ! -d build ]
then 
  mkdir build
fi
echo "Empty build folder"
rm -r build/.*
echo "Copying required files"
cp -r .next/ build/.next/
cp -r static/ build/static/
cp next.config.js build/
cp package-lock.json build/
cp package.json build/
cp routes.js build/
cp server.js build/
cp newrelic.js build/
echo "Copy done"
echo "Zip build"
tar -zcf build.tar.gz build/
echo "Zip Done"
