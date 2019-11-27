# Truebil PWA-SSR

### Installation
 Install node 
```sh
sudo apt-get install nodejs
```
  
Install Node Package Manager
```sh
sudo apt-get install npm
```

```sh
clone pwa repository
cd pwa-ssr/
Run "npm install" command to install node modules
```

To run the app in development mode.
```sh
npm run dev
```

To view it in the browser. (The page will reload if you make edits.)
```sh
http://localhost:3000
``` 

Before serving the build, we need to set the `REACT_APP_ENV` environment variable in `Apache` for GA to work correctly.
```sh
REACT_APP_ENV=[prestaging | staging | production]
```

Build for prestaging
```sh
npm run build:prestaging
```

Build for staging
```sh
npm run build:staging
```

Build for Production
```sh
npm run build:production
```

To upload the production build on S3
```sh
npm run deploy
```

Builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. By default, it also includes a service worker so that your app loads from local cache on future visits. Now app is ready to be deployed