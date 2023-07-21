FROM nginx:latest
COPY ./dist /usr/share/nginx/html/
# 用自定义的nginx.conf 去覆盖镜像中原本的nginx.conf配置u文件
ADD ./nginx.conf /etc/nginx/nginx.conf