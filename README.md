## Installation

Instructions for local development

1. [Install brew](http://crosstown.coolestguyplanettech.com/os-x/40-setting-up-os-x-lion-to-plug-into-homebrew-package-manager)
	1. Install XCode from App Store
	2. 	```ruby <(curl -fsSkL raw.github.com/mxcl/homebrew/go)```
	3. ```brew doctor```
2. [Install node with brew](http://shapeshed.com/setting-up-nodejs-and-npm-on-mac-osx/)
	1. ```brew install node```
3. [Install npm](http://shapeshed.com/setting-up-nodejs-and-npm-on-mac-osx/)
	1. ```curl https://npmjs.org/install.sh | sh```
4. [Install mongodb with brew](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
	1. ```brew install mongodb```
5. Install git with brew
	1. ```brew install git```
	2. git config --global user.name "Your Full Name" # replace the name
	3. git config --global user.email "Your Email Address" # replace the email
6. Create Repositories directory ( not that important )
	1. ```mkdir ~/Repositories```
	2. ```cd ~/Repositories```
	3. ```git clone https://github.com/wrktg/band-date-app.git```
7. Download local packages of node
	1. ```npm install```
8. Download bower packages
	2. ```bower install```

## Run Server

```grunt server```

	