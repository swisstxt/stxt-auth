FROM quay.io/keycloak/keycloak:23.0.1 as base
COPY postgres-socket-factory-1.13.1-jar-with-dependencies.jar /opt/keycloak/providers/
WORKDIR /opt/keycloak

# Build as stage
FROM base as builder
ENV KC_METRICS_ENABLED=true
ENV KC_DB_KIND=postgres
ENV KC_DB_DIALECT=org.hibernate.dialect.PostgreSQL10Dialect
ENV KC_DB_DRIVER=org.postgresql.Driver
RUN /opt/keycloak/bin/kc.sh build --transaction-xa-enabled=false --cache-stack=kubernetes --db=postgres

ENV KC_FEATURES=script

FROM base
COPY --from=builder --chown=1000:0 /opt/keycloak/lib/quarkus/ /opt/keycloak/lib/quarkus/
ENV KC_METRICS_ENABLED=true
ENV KC_DB_KIND=postgres
ENV KC_DB_DIALECT=org.hibernate.dialect.PostgreSQL10Dialect
ENV KC_DB_DRIVER=org.postgresql.Driver

USER 1000
EXPOSE 8080 8443

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
