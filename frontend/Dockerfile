# Etapa 1: Build
FROM node:18 as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

# Etapa 2: Producción
FROM node:18

WORKDIR /app
COPY --from=builder /app ./


# Asegúrate de que 'next start' esté disponible
RUN npm install --omit=dev

EXPOSE 3000
CMD ["npm", "run", "dev"]