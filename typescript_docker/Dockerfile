# bazelとの比較のために用意したTypeScript製ツールをdocker化する一般的なDockerfile
# bazelからは使用しない


# TypeScript build stage
FROM node:12-alpine AS ts-builder
WORKDIR /build

COPY package*.json ./
RUN npm install

COPY tsconfig.json .
COPY src/ src/
RUN ls
RUN ./node_modules/typescript/bin/tsc 

# Setup production stage
FROM node:12-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY --from=ts-builder /build/ts_dist/ dist/

ENTRYPOINT [ "node", "/app/dist/index.js" ]
