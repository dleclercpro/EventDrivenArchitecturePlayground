# Use latest Grafana image
FROM grafana/grafana

# Copy configuration file over to image
COPY ./Grafana/grafana.ini /etc/grafana/
COPY ./Grafana/datasources.yml /etc/grafana/provisioning/datasources/

# Expose necessary port to talk with service
EXPOSE 3000