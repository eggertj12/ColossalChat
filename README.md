ColossalChat
============

Webchat client based on websockets

## Installation

ColossalChat depends on chatserver.js which runs on `Node` server 
For installation and building `npm`, `grunt` and `bower` are required.

### Chatserver

After unpacking to a directory the first step is to prepare `chatserver.js`. 
Navigate to chatserver subdirectory and install node requirements for `chatserver`.

```
$ npm install
```

Chatserver can then be run by issuing the following command

```
$ node chatserver.js
```

### ColossalChat

Building `ColossalChat` is a similarly simple process. 
From package main folder install dependencies as follows
    
```
$ npm install
$ bower install
```

## Building

Building a distribution package is done with grunt

```
$ grunt dist
```

Which concatenates and minifies all files to `dist` directory which can be copied to a webserver, or run locally f.ex. via `python -m SimpleHTTPServer` if `python 2.7.x` is installed on local machine.

## Usage

Should be pretty self explanatory. 
- Navigate to the URL of choice `localhost:8000` in case of running via python in default configuration (note that ColossalChat assumes chatserver to be located at `localhost:8080`)
- Enter a nick of choice
- You will be taken to the lobby from where you can navigate to available chat rooms, or create new ones.
- Once inside a chat room, chat is available (surprise), and by clicking on a username private messaging to other users of the room. Ops of room also get extra commands for managing users.


