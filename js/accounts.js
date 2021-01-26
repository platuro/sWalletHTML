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

function SetTotal(){
    document.getElementById("total").innerText = "Total: $"+total.toFixed(2);
}

//BINANCE
$("#bval0").css("display","none")
$("#bval").css("display","none")
$('#blogin').css("display","none")
$('#blogin').click(function(){
    localStorage.setItem("bapi",$('#bapi').val())
    localStorage.setItem("bsec",$('#bsec').val())
    bData();
})

if(localStorage.getItem("bapi")){
    bData();
}else{
    $('#blogin').css("display","block")
    $("#bval0").css("display","block")
    $("#bval").css("display","block")
}

function bData(){
    BinanceQuery("account","",localStorage.getItem("bapi"),localStorage.getItem("bsec"),function(data){
        var data = JSON.parse(data)
        if(data.makerCommission){
            $('#blogin').css("display","none")
            $("#bval0").css("display","block")
            $("#bval").css("display","block")
            data.balances.forEach(element => {
                if(element.asset == "HIVE"){
                    $("#bval").html(parseFloat(element.free).toFixed(3)+" HIVE")
                    total = total + (parseFloat(element.free) * ticker[mainCurrency.toLowerCase()]);
                    SetTotal();
                }
            });
            $("#bval0").html("Logout")
            $("#bval0").click(function(){
                localStorage.removeItem("bapi")
                localStorage.removeItem("bsec")
                location.reload();
            })
        }
    });
}