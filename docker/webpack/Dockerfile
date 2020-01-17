FROM node:12.12.0-alpine

WORKDIR /webpack

RUN apk update && \
    apk add git && \
    apk add --no-cache curl && \
    touch ~/.bash_profile && \
    curl -o- -L https://yarnpkg.com/install.sh | sh

ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH

RUN sh

COPY ./package.json package.json
RUN yarn install

CMD ["yarn", "watch"]
