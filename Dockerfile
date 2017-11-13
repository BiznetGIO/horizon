FROM ubuntu

ENV HORIZON_BASEDIR=/opt/horizon \
    LANG=C \
    VERSION="stable/pike-gio"

COPY . ${HORIZON_BASEDIR}
WORKDIR ${HORIZON_BASEDIR}
RUN \
  apt-get update && \
  apt-get install -y \
    python-pip python-dev git gettext libpcre3-dev libpcre++-dev libyaml-dev python-yaml && \
    make clean && \
    rm -rf doc/build/ static/ .tox node_modules npm-debug.log && \
    pip install . && \
    pip install neutron-lbaas-dashboard python-memcached && \
    cp openstack_dashboard/local/local_settings.py.example openstack_dashboard/local/local_settings.py && \
    ./manage.py compilemessages && \
    ./manage.py collectstatic --noinput && \
    ./manage.py compress --force && \
    ./manage.py make_web_conf --wsgi && \
    python -m compileall $HORIZON_BASEDIR

EXPOSE 8000
ENTRYPOINT ["/opt/horizon/manage.py","runserver","0.0.0.0:8000"]
