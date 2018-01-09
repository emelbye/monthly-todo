# MonthlyTodo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.2.

## Setup

Download this project with git: `git clone https://github.com/emelbye/monthly-todo.git`
Run `npm install` to install dependencies
Then you must create your firebase application (https://console.firebase.google.com)

## Setup Firebase
Run `npm install -g firebase-tools`
Login to firebase: `firebase login`
Init firebase configuration: `firebase init`

* Are you ready to proceed? Yes
* Which Firebase CLI features? Hosting (In the future, use whatever you need! Press space to select.)
* Select a default Firebase project? 'Your Project' (Choose whatever app you created in the earlier steps)
* What do you want to use as your public directory? dist (This is important! Angular creates the dist folder.)
* Configure as a single-page app? Yes

Go to 'firebase console/Project Configuration/Add firebase to your web app' copy the config var and replace in your enviroments files. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
If you don't want to use the Mock Services to use the In memory database, replace ItemServiceMock and TodoServiceMock with ItemServie and TodoService in src/app/app.module.ts

## Build

Run `ng build --build-optimizer=false` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` (They aren't working because of the refactor to use the firebase service)

## Deploy

Run `firebase deploy`
