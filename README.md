# Tortoise
A (soon to be) autodeploying app that communicates between [Shelly](https://shelly.cloud) and [homebridge-notification-server](https://github.com/Supereg/homebridge-http-notification-server).
## What it does?
The notification server wants a very specific device so it was easier to build a middlewear component that automatically forwards it. Similarly the Shelly is unable to do a POST request which this can do.
## Installation
I have only tested this with 'Shelly-1PM', I am sure it could work for the other Shelly devices, more updates to come.
### Homebridge Side
1. Install `homebridge-http-switch` and `homebridge-http-notification-server`
2. Add your accessory into your `config.json`
```json
{
  "accessory": "HTTP-SWITCH",
  "name": "Outside Lights",
  "switchType": "toggle",
  "notificationID": "",
  "onUrl": "http://<shelly ip>/relay/0?turn=on",
  "offUrl": "http://<shelly ip>/relay/0?turn=off"
}
```
- **name** - The friendly name of the device, this will be displayed in HomeKit.
- **switchType** - Refer to this [documentation](https://github.com/Supereg/homebridge-http-switch), toggle is the one you want.
- **notificationID** - this can be anything as long as it is consistent, I use the ID of the individual Shelly.
- **onUrl** - url to turn the Shelly device on, just replace *<shelly ip>* with the IP of your Shelly.
- **offUrl** - url to turn the Shelly device off, just replace *<shelly ip>* with the IP of your Shelly.
3. Reboot the Homebridge service.

### Tortoise
1. Have terminal access to your Raspberry Pi either by SSH or keyboard access.
2. Install NodeJS using this [tutorial](https://linuxize.com/post/how-to-install-node-js-on-raspberry-pi/) or however you want. The program is tested using 8.x, 10.x and 12.x versions so pick whichever. I'd recommend 10.x
3. Clone the repository `git clone git@github.com:chriscn/Tortoise.git` to wherever you want. I'd recommend the Home directory, then cd into it.
4. Checkout to master (the stablest versions) `git checkout master`
5. Run `npm install`
6. cp `config-sample.json` to `config.json` and configure it. Configuration is below.
7. Ensuring you have `pm2` installed and enabled at [startup](https://pm2.keymetrics.io/docs/usage/startup).
8. Run `pm2 start app/app.js`
9. Enjoy :-)

#### Configuration file
```json
{
  "port": 8182,
  "notification_server": {
    "enabled": true,
    "ip": "",
    "port": 8080
  }
}
```
- **enabled** - whether or not to enable it
- **ip** - the ip of your Homebridge setup
- **port** - the port specified in `/var/lib/homebridge/notificaton-server.json` default is 8080

### Shelly
1. Head to the Shelly IP - make sure you set it to use a static IP.
2. Head to **Actions**
3. Under **Output Switched On URL**, enable it and enter the following url `http://<tortoise_ip>:8182/<notificationID>/ison`
4. Under **Output Switched Off URL** enable it and enter the following url `http://<tortoise_ip>:8182/<notificationID>/isoff`
- Replacing *<tortoise_ip>* with the (static) ip of wherever this hosted.
- Replacing *<notificationID>* with the same notificationID as you declared early

You can find the *<notificationID*> under **Settings** -> **Device Info**
