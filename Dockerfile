FROM nginx:latest
# 删除基础镜像中的 Nginx 配置文件
#RUN rm /etc/nginx/conf.d/default.conf
# 配置文件替换成自己写的
#ADD ./zs-vue.conf /etc/nginx/conf.d/
# 打包文件放置docker目录下
COPY ./zs-vue.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html/