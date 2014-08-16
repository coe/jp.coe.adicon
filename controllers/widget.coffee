###*
@require net.nend
###
args = arguments[0] || {}
$.adview.applyProperties args

createNend = (obj)->
  ad = require("net.nend")
  # adView = ad.createView obj
  if obj.nendId? then obj.apiKey = obj.nendId

  #TODO これだとエラーが起きる
  unless ENV_PRODUCTION then Ti.API.debug "aaaaaaaaaaaaaaaa"
  adView = if OS_IOS then ad.createIconsView obj else ad.createView obj
  unless ENV_PRODUCTION then Ti.API.debug "adview:"+adView
  # 受信成功通知
  adView.addEventListener "receive", (e) ->
    Ti.API.info "nend receive"
  
  # 受信エラー通知
  adView.addEventListener "error", (e) ->
    Ti.API.error "nend error "+e
  # クリック通知
  adView.addEventListener "click", (e) ->
    Ti.API.info "nend click"
  unless ENV_PRODUCTION then Ti.API.debug "adview:"+adView
  adView
exports.H = 0
exports.V = 1

###*
@return View
###
exports.init = (obj={},direction=0)->
  obj.adType = "icon"
  switch direction
    when exports.H 
      obj.width = "320dp"
      obj.height = "75dp"
      obj.orientation = "horizontal"
    when exports.V
      obj.width = "75dp"
      obj.height = "300dp" 
      obj.orientation = "vertical"
  obj = _.extend obj,Alloy.CFG.ad_icon
  $.adview.applyProperties obj
  $.adview.add createNend obj if Ti.Locale.currentLanguage is "ja"

  $.adview