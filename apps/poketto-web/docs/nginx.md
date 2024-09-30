# Nginx

```shell
server {
  # listen on *:443 -> ssl; instead of *:80
  listen 443 ssl;

  server_name poketto.cs-magic.cn;

  ssl_certificate /etc/letsencrypt/live/cs-magic.cn-0002/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/cs-magic.cn-0002/privkey.pem;
  include snippets/ssl-params.conf;

  set $backend_port 2001;

  location / {
    # reverse proxy for next server
    proxy_pass http://localhost:30817;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;

    # 这里很关键，用于 sse 的（不加的话国内服务器就没有stream了，国外服务器有，这点也不知道为什么）
    # 参考：https://stackoverflow.com/a/13673298/9422455
    chunked_transfer_encoding off;
    proxy_buffering off;
    proxy_cache off;

    # we need to remove this 404 handling
    # because next's _next folder and own handling
    # try_files $uri $uri/ =404;
  }
  location ~ /.well-known {
    allow all;
  }
}
```
