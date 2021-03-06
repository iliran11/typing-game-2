# Project Installation

1. **Clone** : `git clone https://github.com/iliran11/typing-game-2.git`
2. **Install** Both the server and the client: `npm run install-fullstack`
3. **Create** `.env` file in root project. contents of the file below are **fully public.** So feel free to play and experiment.

```
###### PUBLIC .ENV FILE ######
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
j
# Start Client And Server

- Start client : `npm start`
- Start server: `npm run start-server`

# Debugging

- Watch server files : `npm run watch-server`
- Start server from vscode Debug
- Restart server with each server file change.
  ![app preview](https://i.imgur.com/smfSGyp.png)

## Client folders

- _src/pages/_ - Pages - compose components and specific behaviours to create unique experience for every page.
- _src/components/_ - Components - generic components being used in Pages.
- _src/middlewares/_ - Managers and Helpers to perform common tasks in generic way
- _src/store/_ - Redux files. holds reducers, actions
- _src/css/base_ - Base animations, base, typography, and utilies.
- _src/css/components_- single scss file for each individual component
- _src/css/layout_ - Header, footer, grid, navigation
- _src/css/pages_ - Pages: Have a single scss for each specific page

## Server folders

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
