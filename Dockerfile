FROM node:lts-slim

RUN ["node", "--version"]

COPY . .
COPY "token" .
RUN ls

RUN ["mv", "token", ".env"]
RUN cat .env

RUN npm install

ENTRYPOINT ["npm", "start"]