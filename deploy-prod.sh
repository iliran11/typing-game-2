docker container run \
--env AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
--env AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY  \
-v $PWD/build:/data \
garland/aws-cli-docker \
aws s3 sync . s3://typeit-prod --delete --acl public-read --exclude="index.html" &&
aws s3 cp ./build/index.html s3://typeit-prod --cache-control no-cache