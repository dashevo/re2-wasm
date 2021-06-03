DOCKER_IMAGE=emscripten/emsdk

git submodule update --init --recursive

docker run \
  --rm \
  -v $(pwd):/src \
  $DOCKER_IMAGE \
  npm run compile && npm run patch
