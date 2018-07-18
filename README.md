# Node Serivce Watchdo

A lightweight service that can be leveraged to observe and manage heavy duty processes. 

## Overview

A node.js applicaion that allows heavy duty proceses to update progress and status that can be broadcasted in real time to subscribers using socket.io

## Prerequisites

* Install `node` 8.11.3 LTS or higher and corresponding `npm`
* Install following modules globally
  * `npm i -g mocha`
  * `npm i -g nodemon`

## Running Application
* Run `npm install` to install dependencies 
* Run `nodemon app.js` to start the application locally
  * As you update code, `nodemon` will restart the application under `api` folder
* Run `nodemon --exec npm test` to start unit tests in locally
  * As you update code, `nodemon` will rerun the unit tests under `test` folder

## Packaging

This node.js application can be packaged into binary executable that can run native on `Windows`, or `macOS` operating systems.

### Windows 

First run `npm install` then run the `package-win.bat` file in terminal, to make `Watchdog.exe`.
You can override the `name` by passing in an argument in commandline, such as `a`.

### macOS 

First run `npm install` then run the `package-win.bat` file in terminal, to make `Watchdog.exe`.
You can override the `name` by passing in an argument in commandline, such as `a`.