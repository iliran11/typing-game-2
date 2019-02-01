# Glossary

## User

Authenticated person. has facebookId and appears in Users collections in mongo.

## Anonymous

person who enters the site and plays without being authenticated.

## Player

a temporary entity to represent a `User` or `Anonymous` in `room`.

## Room

a session of one or more players, competing and typing.

## Game

holds the state of score, correct typings, wrong typings and other metrics for each individual `User` or `Anonymous`
