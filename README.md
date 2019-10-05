# LAB - 40

## Project Dental - Front-end

### Author: Joanna Arroyo

### Links and Resources
* [submission PR](https://github.com/joanna-401-advanced-javascript/project-dental-front/pull/5)
* [travis](https://travis-ci.com/joanna-401-advanced-javascript/project-dental-front)
* [front-end](https://dental-materials.herokuapp.com/)

#### Documentation
* [styleguide](http://192.168.2.67:6060/)

### Modules
#### `index.js` `app.js` `Header.jsx` `Material.js` `Detail.js` `Checkbox.js` `auth.js` `login.js` `create-store.js`
#### `main-reducer.js` `material-reducer.js` `detail-reducer.js` `user-reducer.js` `selected-reducer.js`
#### `detail-actions.js` `material-actions.js` `user-actions.js` `selected-actions.js` `setupTests.js`

##### Exported Values and Methods
###### `app.js -> React Class component`
###### `Header.js -> React functional component`
###### `Material.js -> React functional component`
###### `Details.js -> React Class component`
###### `Checkbox.js -> React Class component`
###### `main-reducer.js -> React functional component`
###### `material-reducer.js -> React functional component`
###### `detail-reducer.js -> React functional component`
###### `detail-actions.js -> React functional components`
###### `material-actions.js -> React functional components`

### Setup
#### `.env` requirements
* `REACT_APP_API` - URL to the running server
* `REACT_APP_SECRET` - Same secret as is used on the server
* `REACT_APP_EDITOR_CODE` - Passcode needed to create editor role
* `REACT_APP_ADMIN_CODE` - Passcode needed to create editor role

#### Running the app
* `npm start`
  
#### Tests
* Unit tests: `npm run test`
* Lint tests: `npm run lint`

#### UML
![UML](./assets/uml.jpg)