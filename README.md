# Load Monitoring Application
The project is a React-Redux-D3 application with Immutable.js. The application visualizes load-monitoring on a system application.

### Features
* Tooltip Hover
* Error / Cleared Message Persistence
* Loading State if the app is refreshed within the 10s interval

# Example


# Organization
Code is organized in app by client and server responsibilities. The d3 logic is encapsulated within a react component.

# Getting started
```
npm install && npm run server
```
Starts the server

```
npm run client
```
Starts the client (localhost:8080)

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

## Server-Side

*Optimization / refactor*: Refactor services to be more functional and use immutable on the back-end as well.
