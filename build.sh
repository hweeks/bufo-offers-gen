export NODE_ENV=production 
export APP_NAME="bufo offers generator" 
yarn && yarn build
unset NODE_ENV
unset APP_NAME
docker buildx build --platform linux/amd64 -t ghcr.io/hweeks/bufo-offers-gen:latest .
docker push ghcr.io/hweeks/bufo-offers-gen:latest