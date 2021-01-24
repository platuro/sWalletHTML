function getPrices(callback=null){
    //STEEM PRICE
    getPrice("steem",function(err,res){
        console.log(ticker,res)
        ticker.steem = res;
        //HIVE PRICE
        getPrice("hive",function(err,res){
            ticker.hive = res;
            //SBD PRICE
            getPrice("steem-dollars",function(err,res){
                ticker.sbd = res;
                //HBD PRICE
                getPrice("hive_dollar",function(err,res){
                    ticker.hbd = res;
                    localStorage.setItem("ticker",JSON.stringify(ticker));
                    if(callback){
                        callback(null,true);
                    }
                })
            })
        })
    })
}

function getPrice(name,callback){
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/"+name,
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            callback(null,res.market_data.current_price.usd)
        }
    });
}

function getPhoto(callback) {
    try {
    navigator.camera.getPicture(callback, null, { quality: 50,
      destinationType: navigator.camera.DestinationType.FILE_URI,
      sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM });
    } catch(err){

    }

    if(navigator.camera == undefined){
        $('body').append('<input id="file-input" type="file" accept="image/png, image/jpeg" name="name" style="display: none;" />')
        $('#file-input').on("change", function(e){ 
            var file = e.target.files[0]; 
            // setting up the reader
            var reader = new FileReader();
            reader.readAsDataURL(file);

            // here we tell the reader what to do when it's done reading...
            reader.onload = readerEvent => {
                var content = readerEvent.target.result; // this is the content!
                callback(content)
            }
        })
        $('#file-input').trigger('click');
    }
}

function Transfer(suser,val,cr,smemo){
    val = parseFloat(val).toFixed(3)

    var t = steem;
    if(platform == "hive"){
        t = hive;
    }

    if(suser != "" && val > 0){
        if(auth){
            t.broadcast.transfer(auth, mainAccount, suser, val+" "+cr, smemo, function(err, result) {
                if(result){
                    //alert("Success!!")
                }else{
                    alert("Error: maybe wrong active-key or low balance??")
                }
            });
        }else{
            try {
                cordova.InAppBrowser.open(ConnectURL+'sign/transfer?to='+suser+"&amount="+val+"%20"+cr+"&memo="+smemo, '_system', 'location=yes');
            } catch (error) {
                window.open(ConnectURL+'sign/transfer?to='+suser+"&amount="+val+"%20"+cr+"&memo="+smemo)
            }
        }
    }
}

function BinanceQuery(endpoint,params,api,key,callback){
    $.ajax({
        url: "https://api.binance.com/api/v3/time",
        success: function(time){
            var end = "recvWindow=60000&timestamp="+time.serverTime
            var hmac = sha256.hmac(key, end);
            var end = end + "&signature="+hmac

            var t = endpoint+"?"+end;
            $.ajax({
                url: server+"/binance",
                data: { "url": t, "api": api},
                success: function(data){
                    callback(data)
                }
            })
        }
    })
}

function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}


getPrices();