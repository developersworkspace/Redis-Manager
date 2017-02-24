# Build from node:6.9.4 Images
FROM node:6.9.4

RUN npm install pm2 -g

WORKDIR ./redis-manager/api

# Copy 'api' source to docker container
ADD ./dist ./
RUN npm install

# Start api using node cli
CMD ["pm2-docker", "./app.js"]