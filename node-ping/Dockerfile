FROM node
RUN mkdir /opt/node-ping
WORKDIR /opt/node-ping
COPY package.json app.js /opt/node-ping/
RUN npm install
EXPOSE 3002
CMD ["npm", "start"]
