# Use an official lightweight Apache image to serve static files
FROM php:8.1-apache

# Copy source files to Apache public directory
COPY src/ /var/www/html/

# Expose port 3000
EXPOSE 3000

# Override default Apache port to 3000
RUN sed -i 's/Listen 80/Listen 3000/' /etc/apache2/ports.conf
RUN sed -i 's/:80/:3000/' /etc/apache2/sites-available/000-default.conf
