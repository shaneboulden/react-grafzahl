FROM registry.redhat.io/ubi8/python-36
USER 1000

COPY dist/ /var/www/html/

# best controlled with an environment variable
EXPOSE 9000
WORKDIR /var/www/html
CMD ["-m","http.server","9000"]
ENTRYPOINT ["/usr/bin/python3"]
