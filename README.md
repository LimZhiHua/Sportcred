# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements

    npm version 6
    `npm install -g npm@6`

## Available Scripts

In the project directory, you can run:

### `npm run dev` to run the frontend and backend

See below for details

### `npm run start` to start the frontend only

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run server` to start the backend only

Runs the app in the development mode.\
Query to REST API at [http://localhost:5000](http://localhost:5000).

### `npm run prod` to start the backend for production

Note on heroku, the server port is dynamic and is written to process.env.PORT

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

You will need: heroku cli https://devcenter.heroku.com/articles/heroku-cli 

Login to a heroku account on the browser with privelleges to write on the project sportcred-staging 
hosted at https://sportcred-staging.herokuapp.com/ 
 
run `npm run deploy` 
to deploy

The deploy script is defaulted to deploy content on `origin` branch `release/v#.#`
Please update accordingly

### Production environment variables

The prod environment variables are under
* frontend `/.env.production`
* backend  `/src/.env.production`

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Archectiture

## MVC - Kinda

The archectiture was designed by team Binary and was intended to follow MVC. To some extent it does, but it's actual implementation splits roles differently. 

**Models**
The models here describes the schema of each collection in mongoDB and are reference by both the controllers in the frontend and the routes in the backend.

**Pages (Kinda the V in MVC)**
Pages contains the views for each different section of the app
- events from the view may trigger controllers
- events update their own state which in turns updates their own view.

Ironically, Pages are more like actual controllers than the Controllers themselves are. Pages control when data change, and how the state and view updates.

**Controllers (Not really the C in MVC)**
The controllers here are responsible for making client side requests to the server. They signal events and simply return pure data without modifying state.

**Routes**
Routes are the api endpoints on the server. Routes perform the necessary effects to the database and returns the relevant data.

## Other Folders / Files

**server.js**
The root of the backend server

**index.js**
The root of the frontend site

**customComponents/**
Contains shared components used across the app

**urls.js**
Defines frontend routes 

**router.js**
Configures the react hash router, points routes to their respective page

**utils.js**
Contains common helper functions

