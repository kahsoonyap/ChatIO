#!/bin/sh

if [ ! -z "$1" ] && [ ! -z "$2" ]
then
  node ./backend/server $1 $2 & npm run start --prefix ./frontend
else
  ECHO Welcome to ChatIO!
  ECHO

  ECHO What program are we using?
  read prog
  ECHO

  ECHO What file are we running?
  read file
  ECHO

  ECHO Please wait one millisecond while we run your command!
  node ./backend/server $prog $file & npm run start --prefix ./frontend
fi
