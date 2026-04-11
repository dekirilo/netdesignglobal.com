FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY build.js .
COPY api.js .
EXPOSE 3001
CMD ["node", "api.js"]
