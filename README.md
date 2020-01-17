# Dockerfile Browser-sync Nginx PHP

Docker上にnginx/php-fpm/browser-sync環境を構築するテンプレート。  
ついでにwebpackでscss/jsコンパイル。

## images

- php:7.4-fpm
- mysql:5.7
- nginx:latest
- phpmyadmin/phpmyadmin
- ustwo/browser-sync
- node:12.12.0

## Usage

```sh
cp .env.template .env
docker-compose up -d
```

## Option

### Webpack Production Build

```sh
# docker containerにログイン
docker exec -it docker-nginx-php_webpack_1 sh

# build
yarn build
```

### Use Laravel

#### SetUp Composer

```sh
# composerのdockerイメージをbuild
$ docker build -t localcomposer -f ./docker/composer/Dockerfile ./composer
```

#### create Laravel Project

``` sh
# ComposerコンテナでLaravel初期プロジェクトを作成
$ docker run -it -v ./app:/var/www/html localcomposer:latest /root/.composer/vendor/bin/laravel new app
```

#### change DocumentRoot

./docker/nginx/default.conf

``` diff
- root /var/www/html;
+ root /var/www/public;

  location / {
-   # try_files $uri $uri/ /index.php?$args;
+   try_files $uri $uri/ /index.php?$args;
-   try_files $uri $uri/ =404;
+   # try_files $uri $uri/ =404;
  }
```
