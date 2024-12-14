# Gunakan image Node.js sebagai base image
FROM node:18-alpine

# Tentukan working directory di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file source code aplikasi ke dalam container
COPY . .

# Build aplikasi Next.js
RUN npm run build

# Tentukan port yang akan digunakan
EXPOSE 5000

# Jalankan aplikasi Next.js
CMD ["npm", "start"]