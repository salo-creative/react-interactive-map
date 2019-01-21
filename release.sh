read -r -p "Run package release? [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]; then

  echo "What type of update is this: major, minor, patch?"
  read version

  echo "Type your commit message:"
  read message

  V="$(npm --no-git-tag-version version $version -f)"

  echo "==== starting bundle ===="

  npm run bundle

  echo "==== ending bundle ===="
  echo "********"
  echo "==== starting changelog addition ===="

  ex -sc "2i|{ "\"user\"": "\""$(git config user.name)"\"", "\"version\"": "\"$V\"", "\"commit\"": "\""$message"\"" }," -cx ./.storybook/changelog.json

  echo "==== ending changelog addition ===="
  echo "********"
  echo "==== starting git logic ===="

  git add -A
  git commit -m "$message"
  git tag -a $V -m "$message"
  git push origin master --tags

  echo "==== ending git logic ===="

  read -r -p "Publish package? [y/N] " response
  if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]; then
    npm publish
  fi

fi

# read -r -p "Run storybook release? [y/N] " response
# if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]; then
#   REMOTE=$(git config --get remote.deployer.url)
#   echo $REMOTE
#   if [ -z "$REMOTE" ]; then
#     git remote add deployer https://github.com/LUSHDigital/ui.git
#   fi
#   npm run deploy-storybook -- --remote=deployer
# fi
