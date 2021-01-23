var total = 0;
var user = window.localStorage.getItem("mainuser");

document.getElementById("total").innerText = "Total: $"+total


total = 0;
if(accounts){
    SetData(accounts);
}
getPrices(function(err,res){
    total = 0;
    steem.api.getAccounts([user], function(err, response){
        console.log(err, response);
        localStorage.setItem("accounts",JSON.stringify(response));
        SetData(response)
    });
})


function SetData(response){
    console.log(response)
    document.getElementById("steemvalv").innerText = response[0].balance;
    document.getElementById("steemvalvd").innerText = response[0][secCurrency.toLowerCase()+"_balance"];
    document.getElementById("steemuser").innerText = response[0].name;

    var steem = parseFloat(response[0].balance.split(" ")[0]);
    var sbd = parseFloat(response[0][secCurrency.toLowerCase()+"_balance"].split(" ")[0]);

    total = 0;
    total = total + (steem * ticker[mainCurrency.toLowerCase()]);
    total = total + (sbd * ticker[secCurrency.toLowerCase()]);

    document.getElementById("total").innerText = "Total: $"+total.toFixed(2);
    document.getElementById("simg").src = AvatarURL+user+"/avatar";
}