var B612Kaji = B612Kaji || {};
B612Kaji.Native = B612Kaji.Native || {};
B612Kaji.Native.android = {};

B612Kaji.Native.android.Function = function() {
  this.callback = {};
}

B612Kaji.Native.android.Function.prototype = {

	saveImage: function(url) {
		this.callback.saveImage = function(result) {
			var resultJson = JSON.parse(result);
			console.log("result parsed sucess :" + resultJson.success + "result parsed errorMessage :" + resultJson.errorMessage);
		};
		window.B612KajiBridgeInterface.saveImage("B612Kaji.Native.android.Function.getInstance().callback.saveImage", url);
	},

	shareImage: function(url) {
		this.callback.shareImage = function(result) {
			var resultJson = JSON.parse(result);
			console.log("result parsed sucess :" + resultJson.success + "result parsed errorMessage :" + resultJson.errorMessage);
		};
		window.B612KajiBridgeInterface.shareImage("B612Kaji.Native.android.Function.getInstance().callback.shareImage", url);
	},

  shareImageWithCallback: function(base64Image, clickCallback, openCallback) {
    this.callback.shareImageWithCallback = function(result) {
      var resultJson = JSON.parse(result);
      openCallback(resultJson); // android执行这个
    };

    this.callback.clickShareButton = function(result) {
      var resultJson = JSON.parse(result);
      clickCallback(resultJson);
    };

		window.B612KajiBridgeInterface.shareImageWithCallback(
		"B612Kaji.Native.android.Function.getInstance().callback.shareImageWithCallback",
		"B612Kaji.Native.android.Function.getInstance().callback.clickShareButton",
		base64Image);
	},

	eventCamera: function(callback, opts) {
		this.callback.eventCamera = function(result) {
			callback(result);
		};
		var extraParam = opts;
		window.B612KajiBridgeInterface.eventCamera("B612Kaji.Native.android.Function.getInstance().callback.eventCamera", JSON.stringify(extraParam));
	},

	getCameraImage: function(callback) {
		this.callback.getCameraImage = function(result) {
			callback(result);
		};
		window.B612KajiBridgeInterface.getCameraImage("B612Kaji.Native.android.Function.getInstance().callback.getCameraImage");
	},

	appInfo: function(callback) {
		this.callback.appInfo = function(result) {
			callback(result);
		};
		if (window.B612KajiBridgeInterface != undefined) {
			window.B612KajiBridgeInterface.appInfo("B612Kaji.Native.android.Function.getInstance().callback.appInfo");
		}
	}
}

B612Kaji.Native.android.Function.getInstance = function() {
  if (B612Kaji.Native.android.Function.instance == null) {
    B612Kaji.Native.android.Function.instance = new B612Kaji.Native.android.Function();
  }
  return B612Kaji.Native.android.Function.instance;
}
B612Kaji.Native.android.Function.instance = null;
