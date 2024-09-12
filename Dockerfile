FROM node:22.6.0-slim

WORKDIR /bot
COPY . .

RUN apt update -y
RUN apt install openjdk-17-jdk -y

RUN npm install

CMD [ "npm", "run", "start" ]