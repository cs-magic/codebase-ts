#!/bin/bash

init-pgvector() {
  # ref: https://github.com/pgvector/pgvector?tab=readme-ov-file#linux-and-mac
  cd /tmp
  git clone --branch v0.7.4 https://github.com/pgvector/pgvector.git
  cd pgvector
  make
  make install # may need sudo
}

init-pgvector