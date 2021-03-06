# Load Monitoring Application
The project is a React-Redux-D3 application with Immutable.js. The application visualizes load-monitoring on a system application. There's a node server using socket.io to communicate to the client, which receives the new state tree and applies set state to it.

```
uptime
```
Is essentially run on your local machine. Loads <1 are averaged together. This is a full-stack app that uses a SOCKET.IO connection to send a `SET_STATE` event to merge state to subsequent React components.  `Cleared Messages` group all `Error Messages` that existed previous to a load < 1; Otherwise, `Error Messages` is a list of loads > 1 sorted by time. New Error messages are added on a set interval of 1 second.

**Note:** The app makes a simplifying assumption, that the first minute of activity (the first number from `uptime`) represents the accurate activity at that particular instance in time.

### Features
* Tooltip Hover
* Error / Cleared Message Persistence
* Loading State if the app is refreshed within the 10s interval
* Post css to last 2 browser versions
* Hot reloading

# Example
![Example Image](http://i.imgur.com/D8wd5Gg.png)

# Organization
Code is organized in app by client and server responsibilities. The d3 logic is encapsulated within a react component.

# Getting started
NOTE: App has been tested with 12.15.0 if you're running. Check if you're running another node version with:
```
  node -v // should be 12.15.0
```

```
  npm install
```
Make sure to NPM Install!

## Developer Mode:

```
  npm run devmode
```
Starts the server, starts webpack dev server on http://localhost:8090

## Production Mode:
```
  npm run start
```
Starts the server, makes the build using webpack if no dist/bundle.js exists
and starts an express server running on http://localhost:8080
# Running tests
## All Tests
```
  npm run test
```

## Client Tests
```
  npm run test:client
```

## Server Tests
```
  npm run test:client
```


# Improvements / To-Do

## Client-Side

*Performance optimization*: Avoid re-rendering the entire SVG path, abstract more logic away from in-line css manipulation, by taking in and removing data points. Less DOM manipulation.

*Feature Add*: If you hover over an error or cleared alert, it should highlight the segment of bars that caused that alert to occur.

*Visual Improvement*: More interesting visual design, css transitions between renders

*Performance Optimization*: Move more of the visual transitions around the tooltip away from d3

## Server-Side

*Optimization / Refactor*: Refactor services to be more functional and use immutable on the back-end as well.
