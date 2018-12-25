#!/bin/sh

: ${SLEEP_LENGTH:=2}

wait_for() {
  echo Waiting for $1 to listen on $2...
  while ! nc -z $1 $2; do echo sleeping; sleep $SLEEP_LENGTH; done
}

echo "$@"

host=postgres
port=5432

wait_for $host $port
echo Not Waiting anymore...
exec "$@"
