#!/bin/sh

if ! command -v caddy &> /dev/null; then
  echo "Error: 'caddy' not found in PATH. Please install caddy before running this script, e.g. via chocolatey."
  exit 1
fi

here=$(dirname "$0")

function cleanup {
    docker compose -f ./docker-compose.yml -f $here/docker-compose.setup.yml down setup > /dev/null
}
trap cleanup EXIT

docker compose -f ./docker-compose.yml -f $here/docker-compose.setup.yml up -d setup > /dev/null

caddy trust