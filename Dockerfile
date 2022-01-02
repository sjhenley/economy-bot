FROM node:lts-slim

RUN ["node", "--version"]

COPY . .

RUN npm install

ENTRYPOINT ["npm", "start"]