require('dotenv').config({ path: './.env.' + `${process.env.REACT_APP_ENV}` })
const path = require('path')
const withPlugins = require('next-compose-plugins');
const webpack = require('webpack')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const withPreact = require('@zeit/next-preact')

module.exports  = {
    publicRuntimeConfig: { // Will be available on both server and client
      assetsUrl: 'https://dw745fgl22f1q.cloudfront.net/',
      zopimUrl: 'https://v2.zopim.com/?34FJfAwL7KXZkla117ZSxcU7rBwhvkWY',
      razorpayUrl: 'https://checkout.razorpay.com/v1/checkout.js',
      ravenLibUrl: 'https://cdn.ravenjs.com/3.22.1/raven.min.js',
    },
    useFileSystemPublicRoutes: true,
    webpack: (config, {defaultLoaders, isServer, buildId, dev}) => {
      config.module.rules.push(
        {
          test: /\.css$/,
          use: [
           {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                extends: path.resolve(__dirname, './.babelrc'),
              },
            },
            {
              loader: 'emit-file-loader',
              options: {
                name: 'dist/[path][name].[ext].js',
              },
            },
            'styled-jsx-css-loader',
          ],
        }
      );
      config.plugins.push(
      new webpack.EnvironmentPlugin(process.env),
      new SWPrecacheWebpackPlugin({
        verbose: true,
        filepath: path.resolve('./static/service-worker.js'),
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: '/',
            options: {
              cache: {
                name: 'html-home'
              }
            }
          },
          {
            urlPattern: /\/listings\/(\?.*)?$/,
            handler: 'networkFirst',
            options: {
              cache: {
                maxEntries: 20,
                name: 'result-page-cache',
                maxAgeSeconds: 518400
              }
            }
          },
          {
            urlPattern: /\/listings\/([0-9]+)\//,
            handler: 'networkFirst',
            options: {
              cache: {
                maxEntries: 20,
                name: 'dedicated-page-cache',
                maxAgeSeconds: 518400 // 6 days
              }
            }
          },
          {
            urlPattern: /\/filters\//,
            handler: 'fastest',
            options: {
              cache: {
                name: 'filter-cache'
              }
            }
          },
          {
            urlPattern: /\/subheader_filters\//,
            handler: 'fastest',
            options: {
              cache: {
                name: 'subheader-filter-cache'
              }
            }
          },
          {
            urlPattern: /\/search_filters\//,
            handler: 'fastest',
            options: {
              cache: {
                name: 'search-filter-cache'
              }
            }
          },
          {
            urlPattern: /\/home_page\//,
            handler: 'fastest',
            options: {
              cache: {
                maxEntries: 20,
                name: 'home-page-cache'
              }
            }
          },
          {
            urlPattern: /\/inventory_info\//,
            handler: 'fastest',
            options: {
              cache: {
                name: 'inventory-info-cache'
              }
            }
          },
          {
            urlPattern: /\/users\/subscription_detail\//,
            handler: 'CacheFirst',
            options: {
              cache: {
                name: 'subscription_detail-cache'
              }
            }
          },
          {
            urlPattern: /\/users\/cities\//,
            handler: 'fastest',
            options: {
              cache: {
                name: 'city-cache'
              }
            }
          },
          {
            urlPattern: /\/get_similar_cars\//,
            handler: 'fastest',
            options: {
              cache: {
                name: 'similar-cars-cache'
              }
            }
          },
          {
            handler: 'fastest',
            urlPattern: /\/about/,
            options: {
              cache: {
                name: 'html-about'
              }
            }
          },
        ]
      })
    )
      return config;
    }
};

/*
   Added preact for Production mode only
*/
module.exports = ( process.env.REACT_APP_ENV === 'production' ) ? 
                    withPreact(module.exports) : module.exports;