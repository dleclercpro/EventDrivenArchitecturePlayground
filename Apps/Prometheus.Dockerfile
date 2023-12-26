# Use latest Prometheus image
FROM prom/prometheus

# Copy configuration file over to image
ADD ./Prometheus/prometheus.yml /etc/prometheus/

# Expose necessary port to talk with service
EXPOSE 9090