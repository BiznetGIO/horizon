angular.module('horizon.app').run(['$templateCache',function($templateCache){$templateCache.put("/static/app/core/images/steps/create-image/create-image.help.html","<dl>\n  <dt translate>Image Name</dt>\n  <dd translate>The name of the image.</dd>\n  <dt translate>Image Description</dt>\n  <dd translate>A description of the image.</dd>\n  <dt translate>Source Type</dt>\n  <dd translate>Uploading the image from a local file or from a specified URL.</dd>\n  <dt translate>Location</dt>\n  <dd translate>If uploading the image via a HTTP URL the image location must be accessible to the Image Service and be a URL direct to the image binary.</dd>\n  <dt translate>Format</dt>\n  <dd translate>Select the format of the disk from the drop down menu.</dd>\n  <dt translate>Kernel</dt>\n  <dd translate>Select the kernel to run from the drop down menu.</dd>\n  <dt translate>Ramdisk</dt>\n  <dd translate>Select the Ramdisk from the drop down menu.</dd>\n  <dt translate>Architecture</dt>\n  <dd translate>The architecture of the image.</dd>\n  <dt translate>Minimum Disk</dt>\n  <dd translate>Amount of disk space in GB that is required to boot the image.</dd>\n  <dt translate>Minimum RAM</dt>\n  <dd translate>Amount of RAM in MB that is required to boot the image.</dd>\n  <dt translate>Visibility</dt>\n  <dd translate>The access permission for the image.</dd>\n  <dt translate>Protected</dt>\n  <dd translate>If set to \'Yes\' then the image cannot be deleted.</dd>\n</dl>\n");}]);