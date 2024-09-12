FROM node:18.20.3-slim

WORKDIR /bot
COPY . .

RUN apt update -y
RUN apt install openjdk-17-jdk -y

RUN npm install

CMD [ "npm", "run", "start" ]