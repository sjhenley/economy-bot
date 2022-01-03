FROM node:lts-slim

COPY . .

RUN npm install

ENTRYPOINT ["npm", "start"]