#!/usr/bin/env bash

docker-compose down --remove-orphans

CONTAINERS="$(docker ps -aq)"
echo "CONTAINERSSSSSS:"
# echo "${CONTAINERS}"
if [ -z "$CONTAINERS" ]
then
echo No CONTAINERS present
else
echo Removing CONTAINERS
docker rm $CONTAINERS
fi

IMAGES="$(docker images -aq)"
echo "IMAGESSSSSSS:"
# echo "${IMAGES}"
if [ -z "$IMAGES" ]
then
echo No IMAGES present
else
echo Removing IMAGES
docker rmi $IMAGES
fi

docker-compose up