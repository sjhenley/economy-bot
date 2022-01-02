FROM node:lts-slim

RUN ["node", "--version"]

COPY . .
COPY ["echo", "BOT_TOKEN=OTI2MjU4MDg1NzgwMTYwNTUz.Yc5DEA.0SC4RwDnXBRONnmftxoA4Hp9Iqo", ">", ".env"]

RUN npm install

ENTRYPOINT ["npm", "start"]