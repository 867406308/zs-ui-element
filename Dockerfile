FROM nginx
COPY ./dist /usr/share/nginx/html/
COPY nginx.conf /mydata/nginx/conf.d/default.conf