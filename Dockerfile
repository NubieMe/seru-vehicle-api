FROM node:21-alpine

WORKDIR /app

COPY package* .
RUN npm i

COPY . .

CMD ["npm", "run", "dev"]