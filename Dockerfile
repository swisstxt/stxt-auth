FROM quay.io/keycloak/keycloak:latest as builder
COPY postgres-socket-factory-1.13.1-jar-with-dependencies.jar /opt/keycloak/providers/

ENV KC_METRICS_ENABLED=true
ENV KC_DB_KIND=postgres
ENV KC_DB_DIALECT=org.hibernate.dialect.PostgreSQL10Dialect
ENV KC_DB_DRIVER=org.postgresql.Driver

RUN /opt/keycloak/bin/kc.sh build --transaction-xa-enabled=false --cache-stack=kubernetes --db=postgres


FROM quay.io/keycloak/keycloak:latest
COPY postgres-socket-factory-1.13.1-jar-with-dependencies.jar /opt/keycloak/providers/
COPY --from=builder --chown=1000:0 /opt/keycloak/lib/quarkus/ /opt/keycloak/lib/quarkus/
WORKDIR /opt/keycloak

#COPY server.keystore conf/

ENV KC_METRICS_ENABLED=true
ENV KC_DB_KIND=postgres
ENV KC_DB_DIALECT=org.hibernate.dialect.PostgreSQL10Dialect
ENV KC_DB_DRIVER=org.postgresql.Driver
#ENV KC_TRANSACTIONS_XA_ENABLED=false

USER 1000

EXPOSE 8080
EXPOSE 8443

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
