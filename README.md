# Load Monitoring Application
The project is a React-Redux-D3 application with Immutable.js. The application visualizes load-monitoring on a system application. There's a node server using socket.io to communicate to the client, which receives the new state tree and applies set state to it.

**Note:** The app makes a simplifying assumption, that the first minute of activity (the first number from `uptime`) represents the accurate activity at that particular instance in time.
### Features
* Tooltip Hover
* Error / Cleared Message Persistence
* Loading State if the app is refreshed within the 10s interval
* Autoprefixed css to last 2 browser versions
* Hot reloading

# Example
![Example Image](http://i.imgur.com/D8wd5Gg.png)

# Organization
Code is organized in app by client and server responsibilities. The d3 logic is encapsulated within a react component.

# Getting started
NOTE: App has been tested with 9.2.0 if you're running. Check if you're running another node version with:
```
node -v // should be 9.2.0
```

```
npm install && npm run server
```
Starts the server

```
npm run client
```
Starts the client (localhost:8080) (wait until packages are installed, do this in a new window)

# Running tests
```
  npm run test
```
Runs tests on both client and server

# Improvements / To-Do

## Client-Side

*Performance optimization*: Avoid re-rendering the entire SVG path, abstract more logic away from in-line css manipulation, by taking in and removing data points. Less DOM manipulation.

*Feature Add*: If you hover over an error or cleared alert, it should highlight the segment of bars that caused that alert to occur.

*Visual Improvement*: More interesting visual design, css transitions between renders

*Performance Optimization*: Move more of the visual transitions around the tooltip away from d3

## Server-Side

*Optimization / Refactor*: Refactor services to be more functional and use immutable on the back-end as well.
