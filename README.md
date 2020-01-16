# Dockerfile Browser-sync Nginx PHP

Docker上にnginx/php-fpm/browser-sync環境を構築するテンプレート

## images

- php:7.4-fpm
- mysql:5.7
- nginx:latest
- phpmyadmin/phpmyadmin
- ustwo/browser-sync

## Usage

```sh
cp .env.template .env
docker-compose up -d
```

## Option

### Use Composer

```sh
# composerのdockerイメージをbuild
$ docker build -t localcomposer -f ./composer/composer.dockerfile ./composer
```

### Laravel

``` sh
# ComposerコンテナでLaravel初期プロジェクトを作成
$ docker run -it -v $(pwd):/var/www/html localcomposer:latest /root/.composer/vendor/bin/laravel new app
```

./docker/nginx/default.conf

``` diff
- root /var/www/html;
+ root /var/www/public;

- # location / {
- #   try_files $uri /index.php?$args;
- # }
+ location / {
+   try_files $uri /index.php?$args;
+ }

- try_files                $uri =404;
+ # try_files                $uri =404;
```
