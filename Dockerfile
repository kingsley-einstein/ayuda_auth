ARG NODE_VERSION=14-alpine
FROM node:${NODE_VERSION}
COPY src ./
COPY package*.json .
RUN npm install
COPY . .
EXPOSE ${PORT}
ENTRYPOINT ["npm", "run", "start:production"]
