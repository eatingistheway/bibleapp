#!/usr/bin/env sh
#run ssh agent
eval $(ssh-agent -s)

#add default ssh 
ssh-add ~/.ssh/id_rsa
ssh-add ~/.ssh/id_ed25519

# abort on errors
set -e

# build
yarn run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
 git push -f git@github.com:eatingistheway/bibleapp.git master:gh-pages

cd -
