grep '^DATABASE_URL=' ../../.env | tail -n 1 | cut -d '=' -f2-
#grep '^DATABASE_URL=' ../../.env.local ../../.env.local.local | tail -n 1 | cut -d '=' -f2-
