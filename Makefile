PYTHON=`which python`
DESTDIR=/
PROJECT=horizon

all:
	@echo "make source - Create source package"
	@echo "make install - Install on local system"
	@echo "make buildrpm - Generate a rpm package"
	@echo "make clean - Get rid of scratch and byte files"

source:
	$(PYTHON) setup.py sdist $(COMPILE)

install:
	$(PYTHON) setup.py install --root $(DESTDIR) $(COMPILE)

buildrpm:
	$(PYTHON) setup.py bdist_rpm --post-install=rpm/postinstall --pre-uninstall=rpm/preuninstall

clean:
	$(PYTHON) setup.py clean
	rm -rf build/ MANIFEST
	find . -name '*.pyc' -delete

run:
	uwsgi --http :8000 --wsgi-file openstack_dashboard/wsgi/horizon.wsgi

dockerbuild:
	docker build -t biznetgio/horizon:latest .

dockerbuilddev:
	docker build -f Dockerfile.dev -t biznetgio/horizon:dev .

dockerrun:
	docker run -p 8000:8000 -it biznetgio/horizon:latest
	@echo "http://localhost:8000"

buildstatic:
	./manage.py compilemessages
	./manage.py collectstatic --noinput
	./manage.py compress --force
	python -m compileall .