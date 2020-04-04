#!/bin/bash
## propduction server
schost="r2.d250.hu"
## user on the production server
scuser="project-devel"
## container on the production server
container="example.com"

## make sure we are in the right folder
INSTALL_BIN="$(realpath "$BASH_SOURCE")"
INSTALL_DIR="${INSTALL_BIN:0:-11}"
cd "$INSTALL_DIR"

## process our pushfiles..
source boilerplate/publishlib.sh

## publish folders/files from project CWD
publish boilerplate


ssh "$scuser@$schost" "ssh $container /bin/srvctl project restart"