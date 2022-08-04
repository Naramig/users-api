#!/bin/bash

docker run --restart=always \
        --name users-api \
        --net=host \
        -e PORT=3000 \
        -e TOKEN_SECRET=12321321 \
        -p 3000:3000 \
        -d users-api
