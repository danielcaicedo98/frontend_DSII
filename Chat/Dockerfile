# Utiliza una imagen de node.js como base
FROM node:14-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu aplicación al directorio de trabajo del contenedor
COPY package.json package-lock.json /app/
COPY index.js /app/

# Instala las dependencias de tu aplicación
RUN npm install

# Expone el puerto 3000 utilizado por tu aplicación
EXPOSE 3000

# Define el comando para iniciar tu aplicación
CMD ["node", "index.js"]
