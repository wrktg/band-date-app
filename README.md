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
	3. ```git clone https://taras@bitbucket.org/taras/re-furniture.net.git```
7. Download local packages of node
	1. ```npm install```
8. Download bower packages
	2. ```bower install```

## Use

### Running local server

* You can run local server with ```grunt server```. 
* It will setup a server that you can access on <http://localhost:9000>. 
* When you start the server, A browser window will automatically open on that url
* The server script will monitor changes that happen to files in **/app** directory and automatically refresh the browser page with latest changes
* The app consists of elements: browser app and backend api
* You can access the backend API by going to <http://localhost:7777>
* The API has a dashboard that you can access from <http://localhost:7777/dashboard>
* The API backend is provided by [deployd.com](http://deployd.com/). Its an open source tool that we are using for our application. It provides a layer between MongoDB and out browser application
* To access the dashboard, you need to enter the following key: 

31a8c646a28ab541b0a920587c68e55417ed3a0ca48ad9586c6f4ea1d72452f0b75bce666ef70b3e2ab4fa626667a4565f4fdaa386565af7f2efa702f03d67aa3e4b5a6b98dd863122b236042b901ff51fd8afcc0425c89f1cf397c0a0dd8702a8aed7c4a7959f0463a245883debc60922b0d223c4b958a6db850aeaabcd02f3023ce7e1864ca67ccc36ceaed04b97ae751793e7f658abe49478d78024e40da4e9d33f4d0413c656a611affeabd64dc22bc6491e34ff4354bc797ffc8c58f550c9b8d9794293ba2f2c7c82d8ca5e37421a6a749c92e471c269494bcc5c2cb5e00b005d8b5db3d6a07d07693347782e8542977ced4bfc3dc399aaf00b3f2f1684


	