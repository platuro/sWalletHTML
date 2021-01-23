$('#accounts').click(function(){
    window.location = "accounts.html";
})

$('#events').click(function(){
    window.location = "events.html";
})

$('#help').click(function(){
    window.location = "misc.html";
})

$('#transfer').click(function(){
    window.location = "transfer.html";
})


$('#logout').click(function(){
    window.localStorage.clear();
    window.location = "index.html";
    admob.banner.hide()
})

$('#market').click(function(){
    window.location = "market.html";
})

$('#policy').click(function(){
    window.location = "policy.html";
})

if(platform != "hive"){
    $('#market').css("display","none")
}