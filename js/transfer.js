total = 0;
var cr = mainCurrency
var suser = null;
var smemo = null;


$('#currencyp').html(mainCurrency)

if(accounts){
    SetData(accounts);
}
getPrices(function(err,res){
    total = 0;
    steem.api.getAccounts([mainAccount], function(err, response){
        console.log(err, response);
        SetData(response)
    });
})


function SetData(response){
    total = 0;
    var steem = parseFloat(response[0].balance.split(" ")[0]);
    var sbd = parseFloat(response[0][secCurrency.toLowerCase()+"_balance"].split(" ")[0]);

    total = total + (steem * ticker[mainCurrency.toLowerCase()]);
    total = total + (sbd * ticker[secCurrency.toLowerCase()]);

    $('#total').html(steem + " "+mainCurrency+" | " +sbd+ " "+secCurrency+" | $"+total.toFixed(2))
}

$('#currencyp').click(function(){
    if(cr == mainCurrency){
        $('#currencyp').html(secCurrency)
        cr = secCurrency
    }else{
        $('#currencyp').html(mainCurrency)
        cr = mainCurrency
    }
})

window.addEventListener('native.keyboardhide', keyboardHideHandler);
function keyboardHideHandler(e){
    show()
}

window.addEventListener('native.keyboardshow', keyboardShowHandler);
function keyboardShowHandler(e){
    hide()
}

function hide(){
    $('.bottombar').css("display","none")
    $('.send').css("display","none")
    admob.banner.hide();
}

function show(){
    $('.bottombar').css("display","block")
    $('.send').css("display","block")
    admob.banner.show();
}

$('#send').click(function(){
    suser = $('#user').val();
    smemo = $('#memo').val();

    var val = $('#value').val()
    Transfer(suser,val,cr,smemo);
})