# Use latest Grafana image
FROM grafana/grafana

# Copy configuration file over to image
ADD ./Grafana/grafana.ini /etc/grafana/grafana.ini
ADD ./Grafana/datasources.yml /etc/grafana/provisioning/datasources/datasources.yml

# Expose necessary port to talk with service
EXPOSE 3000