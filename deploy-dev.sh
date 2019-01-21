docker container run \
--env AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
--env AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY  \
-v $PWD/build:/data \
garland/aws-cli-docker \
aws s3 sync . s3://typing-game-dev --delete --acl public-read &&
aws s3 cp index.html s3://typing-game-dev --metadata '{"Cache-Control":"no-cache"}'