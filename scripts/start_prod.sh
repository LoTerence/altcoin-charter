#!/bin/bash

# build the root image
docker build -t loterence10/altcoin-charter .

# start a docker container in the production environment
docker run -d -p 5000:5000 --env-file server/.env.production --name altcoin-charter-prod loterence10/altcoin-charter