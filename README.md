# Dockerfile Browser-sync Nginx PHP

Docker上にnginx/php-fpm/browser-sync環境を構築するテンプレート

## images

- mysql:5.7
- nginx:latest
- phpmyadmin/phpmyadmin
- ustwo/browser-sync

## Usage

```sh
cp .env.template .env
docker-compose up -d
```
