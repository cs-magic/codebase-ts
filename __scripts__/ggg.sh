function update() {
  local msg="$1"

    if [ -z "$msg" ]; then
      echo "Error: Commit message is required."
      echo "Usage: update \"Your commit message\""
      return 1
    fi

  echo ">> GIT UPDATE STARTED"

  echo ">> GIT UPDATE SUBMODULES STARTED"
  git submodule foreach '
    if [ -n "$(git status --porcelain)" ]; then
      git add . && git commit -m "$0"; git push
    fi
  ' "$msg"
#  git submodule foreach --quiet 'echo $path' | xargs -P 8 -I {} bash -c "git add . && git commit -m \"$1\"; git push"
#  git submodule foreach --quiet 'echo $path' | parallel -j 8 "git add . && git commit -m \"$1\"; git push"
  echo "<< GIT UPDATE SUBMODULES FINISHED"

  echo ">> GIT UPDATE MAIN STARTED"
  git add . && git commit -m "$msg"; git push
  echo "<< GIT UPDATE MAIN FINISHED"

  echo "<< GIT UPDATE FINISHED"
}

update "$1"
