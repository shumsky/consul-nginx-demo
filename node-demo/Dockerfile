FROM node
RUN mkdir /opt/node-demo
WORKDIR /opt/node-demo
COPY package.json app.js /opt/node-demo/
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
