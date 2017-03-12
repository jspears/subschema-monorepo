#!/usr/bin/env bash

function submodules(){
  git config -f .gitmodules --get-regex "submodule.*.url" | sed 's,submodule\.\(.*\).url \(.*\),\1 \2,g'
}

function url(){
  name=${1:-'*'}
  git config -f .gitmodules --get-regex "submodule.${name}.url" | sed 's,submodule\.\(.*\).url \(.*\),\2,g'
}

function unmodule(){
    name=$1
    submodule=$2
    if [ -z $name ];then
        echo "need  a name"
        exit 1
    fi
    if [ -z $submodule ]; then
       submodule=$(url $name)
    fi
    echo "$name $submodule"
}
function remove(){
  submodule=$1
  echo "removing ${submodule}"
  git rm $submodule
}
function merge(){
  submodule=$1
  suburl=${2:-$(url $submodule)}
  origin=${submodule}_origin
  if  [ ! -d $submodule ]; then
    echo "not a submodule dir $submodule"
  fi
  echo "mergin $submodule $suburl";
  git rm $submodule
  git remote add $origin $suburl
  git fetch $origin
# Start a fake merge (won't change any files, won't commit anything)
  git merge -s ours --no-commit $origin/master
  git read-tree --prefix=${submodule} -u $origin/master
  git commit -a -m "demodules ${submodule}"
}
submodules | while read submodule url; do
  merge $submodule $url
done
