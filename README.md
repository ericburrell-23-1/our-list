# OurList

## Description

This project is meant to serve as an easy restaurant list for a group of friends to collaborate and share experiences of their favorite restaurants and ones they hope to try. It includes the ability to add, edit, and delete restaurants to the list. Users are able to search their restaurant list by restaurant name and filter by criteria about the restaurant, such as price, location, or cuisine.

## Progress and Roadmap

This project is currently functional for a single user to operate as a personal restaurant list. This is the point that needed to be achieved in order to display it on a portfolio; however, it is not ready to be deployed.

The goal for this project is to reach a point where many users can create accounts and store their restaurant lists. The roadmap of major milestones that should follow are listed below:

- The creation of a _login_ or _new group_ page that allows users to join a group with an existing name and password or start a new list
- Implementing changes to the database structure and server API in order to accomodate separate restaurant lists
- Implement authentication for accessing a group via JWT stored in httpOnly cookies
- Allow for creation of a user account and associated account management and dashboard

Other future improvements that would improve the functionality of the app that should be implemented prior to deployment:

- Limiting number of results per page and allow for switching results pages
- Ability to sort by additional criteria such as date added, rating, etc. in addition to alphabetical
- Implement data validation to protect server from malicious requests
- Adding additional data about each restaurant including:
  - Boolean indicating whether or not a user has visited the restaurant
  - A rating for the restaurant (0-5 stars)
  - Comments from additional users with access to the group

## Instructions

Under the current architecture of this project, this project is meant to be deployed locally on a user's machine. The server requires a connection to MongoDB (currently set to port 27017), and the client makes several calls to port 3001 on the local network. In order for this to work properly, the client side code needs to know the local IP address. This is currently set in the _constants.js_ file in the _src > Utilities_ directory. **Make sure to update this to the IP Address where the server is running.**

Several scripts are available to assist in easily testing or running the project:

#### Available Scripts

###### In the project directory, you can run:

#### `npm start`

###### Runs the app in the development mode.\

###### Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

###### The page will reload when you make changes.\

###### You may also see any lint errors in the console.

#### `npm test`

###### Launches the test runner in the interactive watch mode.\

###### See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

###### Builds the app for production to the `build` folder.\

###### It correctly bundles React in production mode and optimizes the build for the best performance.

###### The build is minified and the filenames include the hashes.\

###### Your app is ready to be deployed!

###### See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

###### If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

###### Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

###### You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## License

This project is licensed under the terms of the MIT license.
