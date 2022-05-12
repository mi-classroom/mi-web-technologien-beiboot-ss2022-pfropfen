FROM php:apache
#RUN sudo apt install apache2
#RUN apt update
#RUN apt install php libapache2-mod-php -y
COPY . /var/www/html
#RUN service apache2 restart


