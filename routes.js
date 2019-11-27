const routes = require('next-routes')

module.exports = routes()
.add('home-page', '/', 'result')
.add('dedicated-page', '/hotels-in-:cityName([a-zA-Z]+)/:variant([0-9a-zA-Z\-\.\\(\\)\/\&]+)-:listingId([0-9]+)(/?)*', 'dedicated')
.add('result-page', '/used:slug([-]*[0-9a-zA-Z\-\.\\(\\)\&]*)-cars-in-:cityName([a-zA-Z]+)(\/?)*', 'result')
.add('confirmation-page', '/confirmation(/?)', 'confirmation')