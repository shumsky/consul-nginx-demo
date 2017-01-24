FROM node
RUN mkdir /opt/ping-nodejs
WORKDIR /opt/ping-nodejs
COPY package.json app.js /opt/ping-nodejs/
RUN npm install
EXPOSE 3002
CMD ["npm", "start"]
