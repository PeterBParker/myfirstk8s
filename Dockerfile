FROM node:20-alpine
EXPOSE 3000
RUN mkdir /app
WORKDIR /app
COPY ./app/ .
RUN npm install
CMD npm start

