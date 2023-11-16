# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Structure

The project is laid out into 4 main areas:
1. Clients
2. Components
3. Screens
4. Lib (Utils/Helpers/etc)

### Clients

Clients are the interface between the API and the client side. In here we do all of our calls to the API and this allows us to abstract both the data structure and the method of calling from the UI.

**Improvements**
1. I used shared types between the UI and the API responses to save time, in a real world it'd be better to type the response of the client and the response of the API separately.

### Components

Pretty straightforward, these are components that are either:
1. Re-usable OR
2. An abstraction (mostly for code cleanliness)

These can be used throughout the UI. The "re-usable" ones are pretty generic (ie. Button, Input) where as the "abstraction" types are more so to help keep the larger screens clean from smaller UI specific logic or layout details (ie. a single message item from the conversation screen).

**Improvements**
1. Under components the folder structure is okay, just due to time it is what it is, but could be more explicit in terms of which ones are abstractions and which are re-usable UI.
2. Could look for more re-usable UI. In a larger production project I typically have components defined down to individual text elements, headers, etc.

### Screens

These are your "pages" essentially. Screens are responsible for 2 things:
1. Layout of the page
2. Logic related to the page

Layout is straightforward.

For the **logic** it gets laid out using hooks. A pattern I've used before which I liked and used here was defining a hook for each screen, and placing any screen specific logic inside the hook, this keeps the logic encapsulated and easier to read and locate, as well as creating a more testable UI (if you go the unit test route) by being able to test the hook in isolation from the page.

### Lib

This is mostly just helper functions. Stuff that is used across multiple pages or throughout the app.

One notable piece in here is **auth**. Auth is setup using React Context. There are two flows for auth:
1. Coming to the site, not logged in
    - In this flow you would login using the login screen, then the API response with your tokens would be fed to the Context and it is responsible for keeping track of your auth state, as well as setting the tokens to local storage, etc.
2. Coming to the site, previously logged in
    - In this flow you are already logged in, on load the Auth Context checks to see if your tokens exist, if so it'll attempt to fetch your user info, if it *FAILS* then it'll refetch a new token using the refresh token, and then fetch your user info with the updated token, if it fails to refresh your token, it'll log you out.

### Routing

Not mentioned above, but minor piece here. Routing is done with React-Router, and for Auth on each page load it'll check for whether or not you're authorized, you can see this in `lib/auth/RequireAuth.tsx` as well as `screens/Home.tsx`


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.