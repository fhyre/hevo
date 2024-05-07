FROM node:21-alpine
RUN apk add g++ make py3-pip
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD npm run start