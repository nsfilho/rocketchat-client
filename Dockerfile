FROM node:14

WORKDIR /app
COPY package.json .

RUN npm install
COPY ./build ./

RUN npm install -g .

ENTRYPOINT [ "/bin/bash" ]