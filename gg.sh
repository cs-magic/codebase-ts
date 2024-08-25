function update() {
  msg=$1
  echo "== GIT UPDATE STARTED =="

  echo "== GIT UPDATE SUBMODULES STARTED =="
  git submodule foreach --quiet 'echo $path' | xargs -P <N> -I {} bash -c "git add . && git commit -m \"$1\"; git push"
#  git submodule foreach --quiet 'echo $path' | parallel -j 8 "git add . && git commit -m \"$1\"; git push"
  echo "== GIT UPDATE SUBMODULES FINISHED =="

  echo "== GIT UPDATE MAIN STARTED =="
  git add . && git commit -m \"$1\"; git push
  echo "== GIT UPDATE MAIN FINISHED =="

  echo "== GIT UPDATE FINISHED =="
}

update
