FROM debian:jessie

ENV HORIZON_BASEDIR=/opt/horizon \
    KEYSTONE_URL='http://keystone:5000/v2' \
    APACHE_RUN_USER=www-data \
    APACHE_RUN_GROUP=www-data \
    APACHE_PID_FILE=/var/run/apache2/apache2.pid \
    APACHE_RUN_DIR=/var/run/apache2 \
    APACHE_LOCK_DIR=/var/lock/apache2 \
    APACHE_LOG_DIR=/var/log/apache2 \
    LANG=C \
    VERSION="stable/pike-gio"

RUN \
  apt update && \
  apt install -y \
    python-pip python-dev git gettext && \
    git clone --branch $VERSION --depth 1 https://github.com/biznetgio/horizon.git ${HORIZON_BASEDIR} && \
    cd ${HORIZON_BASEDIR} && \
    make clean && \
    rm -rf doc/build/ static/ .tox node_modules npm-debug.log && \
    pip install . && \
    cp openstack_dashboard/local/local_settings.py.example openstack_dashboard/local/local_settings.py && \
    ./manage.py compilemessages && \
    ./manage.py collectstatic --noinput && \
    ./manage.py compress --force && \
    ./manage.py make_web_conf --wsgi && \
    python -m compileall $HORIZON_BASEDIR

WORKDIR "/opt/horizon"
EXPOSE 8000
ENTRYPOINT ["/opt/horizon/manage.py","runserver","0.0.0.0:8000"]
