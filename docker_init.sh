#!/bin/bash

# install nodemon
if [[ ! -d node_modules/nodemon ]]; then
  npm install nodemon -g
fi

# install additional dependencies
if [[ ! -d node_modules ]]; then
    npm install
fi

# start
npm start

