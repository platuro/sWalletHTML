$('.login').click(function(type){
    if(type.target.id != "scan"){
        login(type.target.id); 
    }
})

function login(platform){
    console.log("Login!")
    var username = $('#username').val().toLowerCase();

    console.log(platform)
    if(platform == "hive"){
        steem.api.setOptions({ url: 'https://anyx.io' });
    }
    window.localStorage.setItem("platform", platform);

    var auth = $('#auth').val();
    if(auth != ""){
        window.localStorage.setItem("auth", auth);
    }

    if(username.length > 0){
        steem.api.getAccounts([username], function(err, response){
            if(response){
                if(response.length > 0){
                    if(auth == ""){
                        window.localStorage.setItem("mainuser", username);
                        window.location = "accounts.html";  
                    }else{
                        var pub = response[0]['active']['key_auths'][0][0];
                        if(steem.auth.wifIsValid(auth, pub)){
                            window.localStorage.setItem("mainuser", username);
                            window.location = "accounts.html";  
                        }else{
                            alert("wrong active-key!")
                        }
                    }
                }
            }
        });
    }
}
var mainuser = window.localStorage.getItem("mainuser");
if(mainuser != null){
    steem.api.getAccounts([mainuser], function(err, response){
        if(response){
            setTimeout(function(){ window.location = "accounts.html"; }, 2000);
        }else{
            $('#logindata').css("display","block")
        }
    })
}else{
    $('#logindata').css("display","block")
}

///PLATFORM
//$('.info').text("Easy. "+mainCurrency.toLowerCase()+". Mobile.")
$('.header').text(AppName);