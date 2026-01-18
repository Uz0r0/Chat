# Этап 1: Сборка приложения
FROM node:20-alpine AS build

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем все остальные файлы проекта
COPY . .

# Собираем проект (команда vite build из твоего package.json)
RUN npm run build

# Этап 2: Раздача статики через Nginx
FROM nginx:stable-alpine

# Копируем билд из первого этапа в папку Nginx
# Vite по умолчанию собирает всё в папку 'dist'
COPY --from=build /app/dist /usr/share/nginx/html

# Открываем 80 порт
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]