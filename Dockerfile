FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build
RUN npm run docs
EXPOSE 3001
CMD npm start
