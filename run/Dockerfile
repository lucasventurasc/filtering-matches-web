FROM nginx:1.14-alpine

COPY run/default.conf /etc/nginx/conf.d/default.conf

COPY index.html /usr/share/nginx/html/

ADD build /usr/share/nginx/html/build

RUN echo 'sed -i -e "s|http://localhost:8080|$(echo $BASE_SERVER_URL)|g" -e "s|{{TOKEN}}|$(echo $TOKEN)|g" /usr/share/nginx/html/index.html && nginx -g "daemon off;"'  >> /etc/entrypoint.sh
RUN chmod 777 /etc/entrypoint.sh

CMD ["sh", "-c", "/etc/entrypoint.sh"]
