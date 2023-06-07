# PhotoSharingApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Pre-requisites

[Node](https://nodejs.org/en) and [MongoDB](https://www.mongodb.com/) should be installed on your system.


## How to build and start the project

* Downloard/clone the repository
* Open `server/config/config.json` in any editor
* Change the value of `MONGO_URL` to your MongoDB URL and save the file
* Open terminal/command prompt
* cd (change directory) in to the project folder
* Run `npm install` in your terminal
* Run `npm start` to start the project
* Open your browser and navigate to `http://localhost:4200/`

## Application Walk-through
* The landing page will show you options to Sign Up if you are a new user or Login if you are an existing user.

![home](https://github.com/AnoopKNarayanan/photo-sharing-app/assets/126202194/01f8f3e7-6e69-4d23-bf97-0eeb2c2b027f)
* When you click on `Sign Up` it will take you to the Sign Up page. Here you can create a new account by entering basic details.

![register](https://github.com/AnoopKNarayanan/photo-sharing-app/assets/126202194/ec0b4eee-7335-4734-8451-16100a3ba1e4)
* After you sign up, you can go to the Log In page to log in to your account.

![login](https://github.com/AnoopKNarayanan/photo-sharing-app/assets/126202194/12685e2b-1681-4f1f-a73b-844be98551af)
* Once you log in, you will see the Dashboard. Here you will see a list of all registered users.

![dashboard](https://github.com/AnoopKNarayanan/photo-sharing-app/assets/126202194/fd217735-9d53-428a-b961-0825a57f1861)
* You can follow any user by clicking on the `Follow` button next to their name. You can unfollow any user by clicking on the `Following` button next to their name.

![dash2](https://github.com/AnoopKNarayanan/photo-sharing-app/assets/126202194/520efc4e-120c-42e8-a516-6149f0c13407)
* You can upload your photos by clicking on the `Upload Icon` on the page header.

![dash3](https://github.com/AnoopKNarayanan/photo-sharing-app/assets/126202194/96850d9c-eea8-446b-8874-e054e203740f)
* You can now upload any image you want from your system. All your uploaded images will be visibleto any user who is following you.

![upload](https://github.com/AnoopKNarayanan/photo-sharing-app/assets/126202194/12e868ac-8b16-42c7-96cb-7ae977c509ce)
* Your uploaded images will be available on the `You` page. You can delete any image by hoveringover the image and clicking on the `Delete` icon.

![you](https://github.com/AnoopKNarayanan/photo-sharing-app/assets/126202194/4d71d931-a30b-4b4e-afce-ac7456b0972b)
* On the `Explore` page, you can view images uploaded by people you follow.

![explore1](https://github.com/AnoopKNarayanan/photo-sharing-app/assets/126202194/e3c5e288-a5d9-4c2f-b9e8-77271c20c88a)
![explore2](https://github.com/AnoopKNarayanan/photo-sharing-app/assets/126202194/3f3bee9c-f8af-42f5-b50f-d3a3be919b18)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
