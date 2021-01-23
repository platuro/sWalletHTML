//MISC
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

var STEEMaccounts = ['platuro',"dpublisher.xyz"];
var HIVEaccounts = ['platuro',"dpublisher.xyz"];
var mainAccount = window.localStorage.getItem("mainuser");

///Lists
var accounts = JSON.parse(window.localStorage.getItem("accounts"));

//API NODE
//steem.api.setOptions({ url: 'https://anyx.io' });

var ticker = {
    steem: 0.15,
    sbd: 0.96,
    hive: 0.13,
    hbd: 0.63
}

if(window.localStorage.getItem("ticker")){
  ticker = JSON.parse(window.localStorage.getItem("ticker"));
}

var auth = null;
if(window.localStorage.getItem("auth") != "undefined"){
  auth = window.localStorage.getItem("auth");
}