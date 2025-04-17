# Imagem base do Node
FROM node:18

# Define diretório dentro do container
WORKDIR /app

# Copia os arquivos do projeto
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Expõe a porta 3000 para fora do container
EXPOSE 3000

# Comando para iniciar o app
CMD ["npm", "run", "dev"]
