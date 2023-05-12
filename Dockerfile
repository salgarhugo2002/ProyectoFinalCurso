FROM node:18.13.0

WORKDIR /app

COPY models/ models/

COPY package*.json .

COPY server.js .

COPY api.js .

RUN npm install

COPY . .

CMD ["npm","start"]