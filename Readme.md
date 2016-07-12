Purposes
=================

For auto build on heroku
use this command to disabling production mode and install devDependencies for building the app directly on heroku's servers
heroku config:set NPM_CONFIG_PRODUCTION=false

Compatibility
=================

/!\ This application has been tested on the latest version of Chrome only.

Enable Blur effect for Chrome
=============================

- Go to chrome://flags/#enable-experimental-web-platform-features
- Click on enable experimental web platform features

Requirements
============

Install NodeJS

Dependencies Installation
=========================
npm install

Dev
===
npm run start

Release
=======
npm run build

Publish
=======
npm run publish
