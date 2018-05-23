var isMobile = {
    Android: function() {return navigator.userAgent.match(/Android/i);},
    iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
};

var B612Kaji = B612Kaji || {};
B612Kaji.Native = B612Kaji.Native || {};
B612Kaji.Native.Interface = {};

B612Kaji.Native.Interface = function () {

    if (isMobile.iOS()) {
        this.api = B612Kaji.Native.ios.Function.getInstance();
        this.apiType = 'ios';
    } else if (isMobile.Android()) {
        this.api = B612Kaji.Native.android.Function.getInstance();
        this.apiType = 'android';
    } else {
        this.api = B612Kaji.Native.others.Function.getInstance();
        this.apiType = 'others';
    }
	this.avaliable = true;
}

B612Kaji.Native.Interface.prototype = {

	shareImage: function (url) {
		return this.api.shareImage(url);
	},

	saveImage: function (url) {
		return this.api.saveImage(url);
	},

	shareImageWithCallback: function(base64Image, callback) {
		return this.api.shareImageWithCallback(base64Image, callback);
	},

	eventCamera: function(callback, opts) {
		return this.api.eventCamera(callback, opts);
	},

	getCameraImage: function(callback, type) {
		return this.api.getCameraImage(callback, type);
	},

	appInfo: function(callback) {
		return this.api.appInfo(callback);
	}
}

B612Kaji.Native.Interface.getInstance = function () {
  if (B612Kaji.Native.Interface.instance == null) {
    B612Kaji.Native.Interface.instance = new B612Kaji.Native.Interface();
  }
  return B612Kaji.Native.Interface.instance;
}
B612Kaji.Native.Interface.instance = null;
