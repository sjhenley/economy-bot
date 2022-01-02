FROM node:lts-slim

RUN ["node", "--version"]

COPY . .
COPY ".env" .
RUN cat .env

RUN npm install

ENTRYPOINT ["npm", "start"]