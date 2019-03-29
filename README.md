# Project Installation

1. clone : `git clone https://github.com/iliran11/typing-game-2.git`
2. install both the server and the client: `npm run install-fullstack`
3. create `.env` file in root project. contents of the file below are **fully public.** So feel free to play and experiment.

```
###### PUBLIV .ENV FILE ######
# Authentication Secret
SERVER_AUTH_SECRET = QckT2tkEr4gs

# DATABASE INFO
SERVER_DB_PASSWORD = mZLjKKc9hJYEs6cP
SERVER_DB_USER = admin
SERVER_DB_URL = ds127376.mlab.com:27376/type-it-public
# connect to database:
# mongo ds127376.mlab.com:27376/type-it-public -u admin -p mZLjKKc9hJYEs6cP
SERVER_ENVIROMENT = PUBLIC

# REACT

REACT_APP_PUBLIC_URL = http://localhost:3000
NODE_PATH=./
REACT_APP_ENV=LOCAL
```

# Code Glossary

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

# Notes

## Absolute imports with CRA-TS

    https://github.com/facebook/create-react-app/issues/5645#issuecomment-461999138

## Sass file structure

    inspired from: https://medium.com/@dannyhuang_75970/sass-project-structure-for-big-projects-8c4a740846ee
