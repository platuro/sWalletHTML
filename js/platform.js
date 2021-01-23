var platform = window.localStorage.getItem("platform");

var AppName = "sWallet"
var mainCurrency = "STEEM";
var secCurrency = "SBD";

var AvatarURL = "https://steemitimages.com/u/"

var ConnectURL = "https://steemlogin.com/";

if(platform == "hive"){
    steem.api.setOptions({ url: 'https://anyx.io' });
    mainCurrency = "HIVE"
    secCurrency = "HBD"
    AvatarURL = "https://images.hive.blog/u/"
    ConnectURL = "https://hivesigner.com/";
}

//ADMOB
var adBanner = "ca-app-pub-5248849747003114/1922268489";

//var server = "http://127.0.0.1:4242";
var server = "https://dsocialist.io:4242"