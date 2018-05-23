import {SHARE_API_HOST, webDomain, assetsPublicPath}  from '../../property.js'

var opt = {
    projectName: 'fortune-telling',

    wx_url_ticket: `${SHARE_API_HOST}/faceu/v3/web/weixin_ticket`,
    wb_url_ticket: `${SHARE_API_HOST}/faceu/v3/web/weibo_ticket`,

    wxAppId: "wx0d12a2b71a439bff",
    wbAppId: "1129753260",

    location_url: window.location.href,
    target_url: window.location.href,

    title: '我居然在Faceu和蔡徐坤同同同同同同同框啦！',
    summary: '羡慕的话就来Faceu一起pick pick！',
    pic: `${assetsPublicPath}share-img.png`,
};

export default opt;



// WEBPACK FOOTER //
// ./src/common/share/shareCfg.js
