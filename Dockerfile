ARG NODE_VERSION=latest
FROM node:${NODE_VERSION}
COPY src ./
COPY package*.json .
RUN npm install
COPY . .
RUN ["npm", "run", "build:local"]
ENV PORT=2760
ENV JWT_SECRET=anonymous_kestrel
EXPOSE ${PORT}
ENTRYPOINT ["npm", "run", "start:local"]
