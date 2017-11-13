FROM debian:jessie

ENV HORIZON_BASEDIR=/opt/horizon \
    LANG=C \
    VERSION="stable/pike-gio"

RUN \
  apt update && \
  apt install -y \
    python-pip python-dev git gettext libpcre3-dev libpcre++-dev libyaml-dev python-yaml && \
    git clone --branch $VERSION --depth 1 https://github.com/biznetgio/horizon.git ${HORIZON_BASEDIR} && \
    cd ${HORIZON_BASEDIR} && \
    make clean && \
    rm -rf doc/build/ static/ .tox node_modules npm-debug.log && \
    pip install . && \
    pip install neutron-lbaas-dashboard && \
    cp openstack_dashboard/local/local_settings.py.example openstack_dashboard/local/local_settings.py && \
    ./manage.py compilemessages && \
    ./manage.py collectstatic --noinput && \
    ./manage.py compress --force && \
    ./manage.py make_web_conf --wsgi && \
    python -m compileall $HORIZON_BASEDIR

WORKDIR "/opt/horizon"
EXPOSE 8000
ENTRYPOINT ["/opt/horizon/manage.py","runserver","0.0.0.0:8000"]
