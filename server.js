const NODE_ENV = process.env.NODE_ENV 
// Add newrelic only in production
if (NODE_ENV === 'production') {
  require('newrelic')
}
const express = require('express')
const cookieParser = require('cookie-parser')
const next = require('next')
const routes = require('./routes')
const PORT = 3000

const dev = NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)

function serveStaticFiles(server) {
  server.use(express.static('static'));
}

function setApplicationDefaults(server) {
  server.set('trust_proxy', true);
}

function setApplicationMiddlewares(server) {
  server.use(cookieParser());
}

app.prepare()
.then(() => {
  const server = express();
  setApplicationDefaults(server);
  setApplicationMiddlewares(server);
  serveStaticFiles(server);

  server.use(handle).listen(PORT, (err) => {
    if (err) throw err
    if (dev) {
      console.log('> Server running on http://localhost:3000');
    } else {
      console.log('Server Started');
    }
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})