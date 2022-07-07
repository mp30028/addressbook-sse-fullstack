FROM mysql:8.0.29
LABEL maintainer="zonesoft" \
      email="mp30028@gmail.com" \
      description="Dockerfile with MySql-Server, used for learning purposes"
ENV MYSQL_ROOT_PASSWORD root*P^55word
ENV MYSQL_DATABASE addressbook
ADD create_adressbook_db.sql /docker-entrypoint-initdb.d
EXPOSE 3306
