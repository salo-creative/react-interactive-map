#!/usr/bin/env bash
read -r -p "Run GitHub pages release? [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]; then

  echo "============================================"
  echo "=========== Switching to master ============"
  echo "============================================"

  git stash
  git checkout master
  git pull origin master

  echo "============================================"
  echo "==== Check local and origin are in sync ===="
  echo "============================================"
  if [ "$(git rev-parse master)" = "$(git rev-parse origin/master)" ]
  then
    echo "Branches in sync. Moving on to the deployment"
  else
    echo "Branches not in sync. Please make sure your changes are pushed to master before deploying storybook"
    exit 1
  fi

  echo "============================================"
  echo "========= Run GitHub pages release ========="
  echo "============================================"
  npm run deploy-storybook
fi