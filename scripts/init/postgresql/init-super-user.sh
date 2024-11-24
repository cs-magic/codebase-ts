#!/bin/bash

# todo: 安装 postgresql，并设置开机自启动

init-postgres-user() {

  # Function to check if a command exists
  command_exists () {
      type "$1" &> /dev/null ;
  }

  # Check if PostgreSQL commands are available
  if ! command_exists createuser || ! command_exists psql ; then
      echo "PostgreSQL commands not found. Ensure PostgreSQL is installed and in your PATH."
      echo "You might need to add the following to your ~/.zshrc or ~/.bash_profile:"
      echo "export PATH=\"/usr/local/opt/postgresql@14/bin:\$PATH\""
      exit 1
  fi

  # Create the postgres user
  if createuser -s postgres; then
      echo "User 'postgres' created successfully."
  else
      echo "Failed to create user 'postgres'. It might already exist."
  fi

  # Set the password for the postgres user
  if psql -c "ALTER USER postgres WITH PASSWORD 'postgres';" postgres; then
      echo "Password for user 'postgres' set successfully."
  else
      echo "Failed to set password for user 'postgres'."
      exit 1
  fi

  echo "PostgreSQL user 'postgres' with password 'postgres' has been set up."
}


init-postgres-user
