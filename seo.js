import {stringFormatter} from './helper';

// Routes regex dictionary, mapping each route's regex to its SEO info
var routeRegExObj = {
  "^/$" : {
    title: "Truebil.com - Used cars Marketplace",
    meta: [{
      name: 'description',
      content: 'Searching for 100% verified used cars? Buy good condition, certified, second hand cars at fair prices including free services. ① Search ② Select ③ Buy'
    },
    {
      property: 'og:description',
      content: 'Buy 100% Certified and Inspected Used cars at fair prices. Get easy paper transfer and service warranty. Call 09619022022',
    },
    {
      property: 'og:title',
      content: 'Easiest way to buy and sell used cars'
    },
    {
      property: 'og:site_name',
      content: 'Truebil'
    },
    {
      property: 'og:url',
      content: 'http://m.truebil.com'
    }]
  },
  "/used-cars-in-([a-zA-Z]+)/([0-9a-zA-Z-.()/&]+)-([0-9]+)(/?)" : {
    title: null,
    page: 'dedicated',
    meta: [{
      name: 'description',
      content: stringFormatter`Used ${'variantName'} in ${'cityName'} at Truebil. Buy 100% certified, pre-inspected, Second Hand ${'variantName'} in ${'cityName'} - ${'id'}`
    },
    // title cannot be set from here
    {
      property: 'og:description',
      content: stringFormatter`Now buy certified, pre-inspected used ${'variantName'} directly from seller at great haggle free prices. Free Warranty and Paper Transfer`,
    },
    {
      property: 'og:site_name',
      content: 'Truebil'
    },
    {
      property: 'og:url',
      content: stringFormatter`http://m.truebil.com${'location'}`
    }]
  },
  "/used([-]*[0-9a-zA-Z-.()&]*)-cars-in-([a-zA-Z]+)(?:(/?)|(/\?id=[0-9,]+))" : {
    title: null,
    page: 'results',
    meta: [{
      name: 'description',
      content: stringFormatter`Buying Used Cars in ${'cityName'}? Find the best deals on good condition, verified second hand cars of different &#x2713; Brands &#x2713; Models &#x2713; Price &#038; Year.`
    },
    {
      property: 'og:description',
      content: 'Buy Used Cars at Haggle free prices. Certified second hand cars on Truebil.com',
    },
    {
      property: 'og:title',
      content: 'Buy Used Cars, Second Hand Cars for Sale | Truebil.com'
    },
    {
      property: 'og:site_name',
      content: 'Truebil'
    },
    {
      property: 'og:url',
      content: stringFormatter`http://m.truebil.com${'location'}`
    }]
  },
  "/used-car-loan(/?)" : {
    title: "Used car loan - Truebil.com",
    meta: [{
      name: 'description',
      content: 'Get best used car loan at minimum EMI and lowest interest rate. Expert Guidance | Best Deals | Quick Disbursement'
    }]
  },
  "/used-car-insurance(/?)" : {
    title: "Used car insurance - Truebil.com",
    meta: [{
      name: 'description',
      content: 'Get best car Insurance. Customised Policies | Quick Quotes and Fast Processing | Multiple Payment Modes'
    }]
  },
  "/used-car-paper-transfer(/?)" : {
    title: "Used car paper transfer - Truebil.com",
    meta: [{
      name: 'description',
      content: 'Get used car paper tranfer hassle free. Fast & Simple | Delivered at your door step'
    }]
  },
  "/used-cars(/?)$" : {
    title: "Used Cars | Buy Second Hand Cars | Certified Used Cars - Truebil.com",
    meta: [{
      name: 'description',
      content: 'See used cars in $this->userCity by &#x2713; Brands &#x2713; Models &#x2713; Price &#x2713; Fuel Type &#038; Body Type. Get good condition, second hand cars at Truebil.com'
    }]
  },
  "/sell-used-car(/?)*" : {
    title: "Sell your car - Truebil.com",
    meta: [{
      name: 'description',
      content: 'Sell your car at the best price quickly. Book FREE inspection at your place and time. Find genuine buyers.'
    },
    {
      property: 'og:description',
      content: 'Sell your car at the best price quickly. Schedule a free Inspection Now! Call 09619022022',
    },
    {
      property: 'og:title',
      content: 'Easiest way to sell your car'
    },
    {
      property: 'og:site_name',
      content: 'Truebil'
    },
    {
      property: 'og:url',
      content: stringFormatter`http://m.truebil.com${'location'}`
    }]
  },
  "/sell-used-cars-in-([a-zA-Z]+)(/?)*" : {
    title: "Sell your car - Truebil.com",
    meta: [{
      name: 'description',
      content: 'Sell your car at the best price quickly. Book FREE inspection at your place and time. Find genuine buyers.'
    },
    {
      property: 'og:description',
      content: 'Sell your car at the best price quickly. Schedule a free Inspection Now! Call 09619022022',
    },
    {
      property: 'og:title',
      content: 'Easiest way to sell your car'
    },
    {
      property: 'og:site_name',
      content: 'Truebil'
    },
    {
      property: 'og:url',
      content: stringFormatter`http://m.truebil.com${'location'}`
    }]
  },
  "/contact(/?)" : {
    title: "Contact Us | Truebil.com"
  },
  "/about(/?)" : {
    title: "About Us | Truebil.com"
  },
  "/seller-dashboard-checkout(/?)" : {
    title: "User"
  },
  "/user/seller-dashboard(/?)" : {
    title: "User"
  },
  "/user/subscription(/?)" : {
    title: "User"
  },
  "/user/dashboard(/?)" : {
    title: "User"
  },
  "/checkout(/?)" : {
    title: "Checkout"
  },
  "/sellerDashboardCheckout(/?)" : {
    title: "Seller Checkout"
  }
}

/**
  * @desc Sets SEO info based on current location
  * @param {string} `location`  Current Location
  *
  */
export function setSEOInfo(location) {
  var metaOGTags = ['og:description', 'og:title', 'og:url', 'og:site_name'];
  var isLocationMatch = false;

  // remove existing meta tags
  var existingMetaTags = document.getElementsByTagName('meta');
  var metaDescTag = document.querySelectorAll('meta[name="description"]')[0];

  for (var i=0; i < existingMetaTags.length; ) {
    var propertyName = existingMetaTags[i].getAttribute('property');
    if (metaOGTags.indexOf(propertyName) !== -1) {
      existingMetaTags[i].parentNode.removeChild(existingMetaTags[i]);
    } else {
      i++;
    }
  }

  if (metaDescTag) {
    metaDescTag.parentNode.removeChild(metaDescTag);
  }

  for (var key in routeRegExObj) {
    var pageTitle,
        metaInfo,
        regExpObj = new RegExp(key),
        matches = regExpObj.exec(location),
        variantName,
        cityName,
        listingId,
        modifiedUrlSlug;

    if (matches) {
      pageTitle = routeRegExObj[key].title;
      metaInfo = routeRegExObj[key].meta;

      if (!pageTitle) {
        if (routeRegExObj[key].page === 'dedicated') {
          var variantNameSlug = matches[2],
              variantNameArr = variantNameSlug.split('-');
          variantName = (variantNameArr.slice(1, variantNameArr.length - 3)).join(' ');
          cityName = matches[1].replace(matches[1][0], matches[1][0].toUpperCase());
          listingId = matches[3];

          pageTitle = 'Used ' + variantName + ' in ' + cityName + ' - ' + matches[3] + ' | Truebil.com';
        } else if (routeRegExObj[key].page === 'results') {
          var keySlug = matches[1];
          cityName = matches[2].replace(matches[2][0], matches[2][0].toUpperCase());

          if (keySlug) {
            modifiedUrlSlug = keySlug.replace(/\-|\+/g, ' ');

            modifiedUrlSlug = modifiedUrlSlug.replace(' suv', ' SUV');
            modifiedUrlSlug = modifiedUrlSlug.replace(' mpv', ' MPV');
            modifiedUrlSlug = modifiedUrlSlug.replace(' lpg', ' LPG');
            modifiedUrlSlug = modifiedUrlSlug.replace(' cng', ' CNG');
            modifiedUrlSlug = modifiedUrlSlug.replace(' to', ' To');

            // uppercase each word
            modifiedUrlSlug = modifiedUrlSlug.replace(
              /\w\S*/g,
              function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1);
              }
            );

            pageTitle = 'Used ' + modifiedUrlSlug + ' Cars In ' + cityName + ' - Truebil.com';
          } else {
            pageTitle = 'Used Cars In Mumbai | Second Hand Cars for Sale - Truebil.com';
          }
        }
      }

      if (metaInfo) {
        for (i=0; i < metaInfo.length; i++) {
          var attribute,
              attributeContent,
              tagContent;

          if (metaInfo[i].property) {
            attribute = 'property';
            attributeContent = metaInfo[i].property;
          } else {
            attribute = 'name';
            attributeContent = metaInfo[i].name;
          }

          if (routeRegExObj[key].page === 'dedicated' && typeof metaInfo[i].content === 'function') {
            tagContent = metaInfo[i].content({
              'variantName': variantName, 'cityName': cityName, 'id': listingId, 'location': location
            });
          } else if (routeRegExObj[key].page === 'results' && typeof metaInfo[i].content === 'function') {
            if (attribute === 'name' && attributeContent === 'description') {
              if (modifiedUrlSlug !== undefined) {
                tagContent = "Buy 100% verified used" + modifiedUrlSlug + " cars in " + cityName + ". Find all kinds of Second Hand cars for Sale. Get Car loan &#x2713; Insurance &#x2713; paper transfer &#038; Service Warranty."
              }
              else if (cityName === 'India') {
                tagContent = "Get second hand cars at best price in India. 100% Certified cars with &#x2713; Car loan &#x2713; warranty &#038; Paper Transfer Services.";
              } else {
                tagContent = metaInfo[i].content({'cityName': cityName});
              }
            } else {
              tagContent = metaInfo[i].content({'location': location});
            }
          }
          else {
            if (typeof metaInfo[i].content === 'function') {
              tagContent = metaInfo[i].content({'location': location});
            } else {
              tagContent = metaInfo[i].content;
            }
          }
          setMetaTag(attribute, attributeContent, tagContent);
        }
      }

      document.title = pageTitle;
      setCanonicalLink(location);
      isLocationMatch = true;
    }
  }

  if (!isLocationMatch) {
    document.title = '404 Page Not Found | Truebil';
  }
}

/**
  * @desc Creates a meta tag and appends to the head
  * @param {string} `attribute`  (eg. 'property', 'name')
  * @param {string} `attributeContent`  (eg. 'description', 'og:title')
  * @param {string} `tagContent`  content to set in the `content` attribute of the tag
  *
  */
export function setMetaTag(attribute, attributeContent, tagContent) {
  var metaTag = document.querySelectorAll('meta[' + attribute + '="' + attributeContent + '"]')[0];
  
  if (metaTag) {
    metaTag.parentNode.removeChild(metaTag);
  }

  var newMetaTag = document.createElement('meta');
  newMetaTag.setAttribute(attribute, attributeContent);
  newMetaTag.content = tagContent;
  document.head.appendChild(newMetaTag);
}

/**
 * @desc Sets canonical link to the current path
 * @param {string} `location` current path
 *
 */
function setCanonicalLink(location) {
  var canonicalLinkElement = document.createElement('link');

  canonicalLinkElement.setAttribute('rel', 'canonical');
  canonicalLinkElement.setAttribute('href', 'https://www.truebil.com' + location);

  document.head.appendChild(canonicalLinkElement);
}
