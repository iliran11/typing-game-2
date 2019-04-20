# list all apps
heroku apps

# restart app
heroku restart --app typeit-production

# logs
heroku logs --tail --app typeit-production

# Rename App name
heroku apps:rename newname --app oldname

# change env var
heroku config:set GITHUB_USERNAME=joesmith

# unset config var

$heroku config:unset SERVER_DB_ENVIROMENT --app typeit-production
