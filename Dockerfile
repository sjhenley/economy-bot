FROM node:lts-slim

RUN ["node", "--version"]

COPY . .
RUN ls

RUN ["mv", "token", ".env"]
RUN cat .env

RUN npm install

ENTRYPOINT ["npm", "start"]