[![Stories in Ready](https://badge.waffle.io/devhart/divvy.png?label=ready&title=Ready)](https://waffle.io/devhart/divvy)
[![Stories in Ready](https://badge.waffle.io/devhart/divvy.png?label=ready&title=Ready)](https://waffle.io/devhart/divvy)
# divvy

#### Hack Reactor Greenfield Project - Expense Splitting App

## Description
Divvying up expenses between friends and peers can be a disaster. Remember that time you went on a trip and one person rented the car and another paid for dinners and a third bought the gas and the beer and then you had to even-up while accounting for tips? Or that time rent was due but someone had purchased all of the groceries and utilities for the month? Enter Divvy.

Divvy allows users to enter expenses as they are incurred, and calculates the best way to settle the bill. No more painful math and messy payments to different people, Divvy simplifies everything down to one payment per person.

[![Build Status](https://travis-ci.org/devhart/divvy.svg?branch=master)](https://travis-ci.org/devhart/divvy.svg?branch=master)

## Team

  - __Product Owner__: [Hannah Henderson](https://github.com/hchsquared)
  - __Scrum Master__: [James Ramadan](https://github.com/jamesramadan)
  - __Development Team Members__: [Dennis Ting](https://github.com/dting), [Wayne Adams](https://github.com/wayneadams)

## Tech Stack

### Server
  - __Node__ - v6.3.0
  - __Sequelize__ - ORM for defining app data relationships and managing queries.
  - __Express__ - Server with convenient routing and large collection of middleware packages to handle requests.
  
### Client
  - __Angular__ - MV* framework to build readable, maintainable, and testable client interface to our app. The app may be reviewed by another group as a legacy project.

### Development tools
  - __Gulp__ - Task runner to automate and simplify development, build, and deployment processes.

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    2. [Tasks](#tasks)
4. [Team](#team)
5. [Contributing](#contributing)

## Usage (tbd)

> Some usage instructions

## Requirements (tbd)

- Node 6.3.0

## Development

### Installing Dependencies (tbd)

### Setting Up passport-facebook

1. Sign up to be a [Facebook developer](https://developers.facebook.com/).
2. Click the "Create a New App" on your [apps page](https://developers.facebook.com/apps/).
3. Choose a "Website" app and give it a name.
4. Add a contact email and a category when prompted.
5. Complete the captcha and wait for the app to be created.
6. Scroll down to the "Tell us about your website" portion of the next page, enter:  
     `http://localhost:3000/`
7. Click "Next" and scroll back to the top of the page. Click on the "Skip Quick Start" button.
8. Click the "+ Add Product" button on the left side of the dashboard.
9. Click the "Get Started" button next to "Facebook Login".  
10. For "Valid OAuth redirect URIs", enter:  
     `http://localhost:3000/auth/facebook/callback`
11. Click "Save Changes" on the bottom right.
12. Go back to the app dashboard by clicking the "Dashboard" menu item on the top left.
13. Make a copy of `./server/config/.env.sample.js` as `./server/config/.env.js`. Notice that the `.env.js` file is a JavaScript file. The value for each property of the exported object in this file should be a string. Make sure there are single quotes around the pasted in values.
14. Copy the "App ID" and replace `FACEBOOK_ID`'s value with the copied value.
15. Click the "Show" button for "App Secret". Enter your Facebook password to display the value. Copy the shown value and into the `.env.js` file as the `FACEBOOK_SECRET`.
16. With the dev server running, navigating to `http://localhost:3000/auth/facebook` redirects the browser to Facebook and ask for app authorization. Once authorized, the browser redirects to `http://localhost:3000/auth/facebook/callback` with a `code` query param (logged on the server). The browser then redirects to the application root.

### Roadmap

View the project roadmap [here](https://github.com/devhart/divvy/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
