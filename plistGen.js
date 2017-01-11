var fs = require('fs');
var plist = require('plist');
var manifestJson = {
    "items": [{
        "assets": [{
            "kind": "software-package",
            "url": "https://www.zhouzhongyuan.com/yigomobile/public/ios/1463708886000/Yigo520-debug.ipa"
        }],
        "metadata": {
            "bundle-identifier": "com.bokesoft.ceo",
            "bundle-version": "1.2.7",
            "kind": "software",
            "title": "车掌柜"
        }
    }]
};
var assets = manifestJson.items[0].assets;
var metadate = manifestJson.items[0].metadata;
function plistGen(o,ipaUrl){
    return new Promise(function(resolve,reject){
        console.log(ipaUrl)
        var url = encodeURI(ipaUrl);
        console.log(url);
        assets[0].url = url;
        metadate['bundle-identifier'] = o.appPackageName;
        metadate['bundle-version'] = o.appVersion;
        metadate['title'] = o.appName;
        console.log(manifestJson);
        var data = plist.build(manifestJson);
        var fileName = 'manifest.plist';
        fs.writeFile(fileName, data, (err) => {
            if (err) {
                reject(err)
            };
            resolve(`${fileName} was saved!`);
        });

    })
};
module.exports = plistGen;