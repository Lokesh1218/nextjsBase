import Document, { Head, Main, NextScript } from 'next/document';
import {apiUrl, ravenKey} from '.././globalConstants';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, shrink-to-fit=yes" />
          <meta name="google" content="notranslate" />
          <meta property="fb:page_id" content="770610146365810" />
          <meta property="fb:admins" content="100000088001362,549023542,1316990681,100000662250963,851700606,1584514963,1632840901" />
          <meta name="twitter:id" content="2988084109" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@mytruebil" />
          <meta name="twitter:title" content="Future Indian Autospace" />
          <meta name="twitter:description" content="A reliable quick'n'easy used car marketplace." />
          <meta name="twitter:image" content="https://dw745fgl22f1q.cloudfront.net/favicon/apple-touch-icon-192-v1.png" />
          <meta property="og:image" content="https://dw745fgl22f1q.cloudfront.net/favicon/apple-touch-icon-192-v1.png" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />    
          <meta name="theme-color" content="#FFF" />
          <link rel="dns-prefetch" href="https://d1bxm722pxmpby.cloudfront.net/" />
          <link rel="preconnect" href="https://dw745fgl22f1q.cloudfront.net/" crossOrigin="true"/>
          <link rel="preconnect" href={apiUrl} crossOrigin="true"/>
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          <link rel="dns-prefetch" href="https://connect.facebook.net" />
          <link rel="dns-prefetch" href="https://checkout.razorpay.com" />
          <link rel="dns-prefetch" href="https://cdn.ravenjs.com" />
          <link rel="apple-touch-icon" href="https://dw745fgl22f1q.cloudfront.net/favicon/apple-touch-icon-76-v1.png" />
          <link rel="apple-touch-icon" sizes="57x57" href="https://dw745fgl22f1q.cloudfront.net/favicon/apple-touch-icon-57-v1.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="https://dw745fgl22f1q.cloudfront.net/favicon/apple-touch-icon-76-v1.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="https://dw745fgl22f1q.cloudfront.net/favicon/apple-touch-icon-120-v1.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="https://dw745fgl22f1q.cloudfront.net/favicon/apple-touch-icon-152-v1.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="https://dw745fgl22f1q.cloudfront.net/favicon/apple-touch-icon-180-v1.png" />
          <link rel="apple-touch-icon" sizes="192x192" href="https://dw745fgl22f1q.cloudfront.net/favicon/apple-touch-icon-192-v1.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" sizes="76x76" type="image/x-icon" href="https://dw745fgl22f1q.cloudfront.net/favicon/apple-touch-icon-76-v1.ico" />
          <script dangerouslySetInnerHTML={{__html: `
            // Redirect To desktop site if width is greter than 800
            var width = screen.width;
            if (width > 800) {
              url = window.location.href;
              url = url.replace(window.location.host, 'www.truebil.com');
              document.location.replace(url);
            } `
            }}
          />
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{__html: `window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
            window.ga('create', 'UA-60246145-1', 'auto');` }}
          />
          <Main />
          <NextScript />
          <script async src='https://www.google-analytics.com/analytics.js'></script>
          <script src="https://cdn.ravenjs.com/3.22.1/raven.min.js" crossOrigin="anonymous"></script>
          <script dangerouslySetInnerHTML={{__html: `Raven.config(${"\'" + ravenKey + "\'"}).install()`}}
          />
          <script dangerouslySetInnerHTML={{__html: `
            !function(f,b,e,v,n,t,s) {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','//connect.facebook.net/en_US/fbevents.js');

              fbq('init', '450909781743909');
              fbq('track', 'PageView');` }}
          />
        </body>
      </html>
    )
  }
}