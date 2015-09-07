QR Billing App
=================

## Installation
 - sudo npm install -g ionic cordova
 - cordova plugin add https://github.com/wildabeast/BarcodeScanner.git
 - bower install
 - ionic run android --livereload --consolelogs
 
## Running the app
tmuxifier can be very useful, you can use the following command:  
`tmuxifier w qrbilling`  

For more info, visit: [https://github.com/jimeh/tmuxifier](https://github.com/jimeh/tmuxifier)  

## Building the app
We use the [gulp-ng-constant](https://www.npmjs.com/package/gulp-ng-constant) plugin for configuration  
You find the config file in **app/ngConstants.json**  
You can set the environment like `ENV=staging gulp build`

**Existing environments:**  
 - development  
 - development-device (in this scenario we're using a real device in the same network)  
 - staging   
 - production  


## Deploy the app
Use the `rhc` cli tool to work with openshift
 


