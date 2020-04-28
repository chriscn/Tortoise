# Tortoise
A (soon to be) autodeploying app that communicates between [Shelly](https://shelly.cloud) and [homebridge-notification-server](https://github.com/Supereg/homebridge-http-notification-server). Will deploy with Docker eventually to a server.
## What it does?
The notification server wants a very specific device so it was easier to build a middlewear component that automatically forwards it. Similarly the Shelly is unable to do a POST request which this can do.
## Installation
### Configuration file
The there is  a sample configuration file in the project,
