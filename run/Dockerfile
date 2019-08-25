FROM nginx:1.14-alpine

COPY run/default.conf /etc/nginx/conf.d/default.conf

COPY index.html /usr/share/nginx/html/

ADD build /usr/share/nginx/html/build

RUN echo 'sed -i -e "s|http://0.0.0.0:8080|$(echo $BASE_SERVER_URL)|g" /usr/share/nginx/html/index.html && nginx -g "daemon off;"'  >> /etc/entrypoint.sh
RUN chmod 777 /etc/entrypoint.sh

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && ./etc/entrypoint.sh