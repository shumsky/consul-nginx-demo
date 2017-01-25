FROM node
RUN mkdir /opt/ping-nodejs
WORKDIR /opt/ping-nodejs
ADD package.json /opt/ping-nodejs
ADD src /opt/ping-nodejs/src
RUN npm install
EXPOSE 3002
CMD ["npm", "start"]
