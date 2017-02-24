# Build from node:6.9.4 Images
FROM node:6.9.4

WORKDIR ./redis-manager/api

# Copy 'api' source to docker container
ADD ./dist ./
RUN npm install

# Start api using node cli
CMD ["node", "./app.js"]