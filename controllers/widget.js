// Generated by CoffeeScript 1.8.0

/**
@require net.nend
 */
var args, createNend;

args = arguments[0] || {};

$.adview.applyProperties(args);

createNend = function(obj) {
  var ad, adView;
  ad = require("net.nend");
  if (obj.nendId != null) {
    obj.apiKey = obj.nendId;
  }
  if (!ENV_PRODUCTION) {
    Ti.API.debug("aaaaaaaaaaaaaaaa");
  }
  adView = OS_IOS ? ad.createIconsView(obj) : ad.createView(obj);
  if (!ENV_PRODUCTION) {
    Ti.API.debug("adview:" + adView);
  }
  adView.addEventListener("receive", function(e) {
    return Ti.API.info("nend receive");
  });
  adView.addEventListener("error", function(e) {
    return Ti.API.error("nend error " + e);
  });
  adView.addEventListener("click", function(e) {
    return Ti.API.info("nend click");
  });
  if (!ENV_PRODUCTION) {
    Ti.API.debug("adview:" + adView);
  }
  return adView;
};

exports.H = 0;

exports.V = 1;


/**
@return View
 */

exports.init = function(obj, direction) {
  var _ref;
  if (obj == null) {
    obj = {};
  }
  if (direction == null) {
    direction = 0;
  }
  if (false) {
    obj.adType = "icon";
    switch (direction) {
      case exports.H:
        obj.width = "320dp";
        obj.height = "75dp";
        obj.orientation = "horizontal";
        break;
      case exports.V:
        obj.width = "75dp";
        obj.height = "300dp";
        obj.orientation = "vertical";
    }
    obj = _.extend(obj, Alloy.CFG.ad_icon);
    $.adview.applyProperties(obj);
    if (Ti.Locale.currentLanguage === "ja" && !((_ref = Alloy.CFG.ad) != null ? _ref.hide : void 0)) {
      $.adview.add(createNend(obj));
    }
  }
  return $.adview;
};
