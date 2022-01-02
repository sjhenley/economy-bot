FROM node:lts-slim

RUN ["node", "--version"]

COPY . .
RUN echo "BOT_TOKEN=$DISCORD_BOT_TOKEN" > .env

RUN npm install

ENTRYPOINT ["npm", "start"]