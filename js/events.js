var template = $('#eventtemp').html();
var dateo = $('#eventdate').html();
var lastDate = null;

var curYear = new Date().getFullYear();

steem.api.getAccountHistory(mainAccount, -1, 10000, function(err, result) {
    result.reverse();
    localStorage.setItem("events",JSON.stringify(result));
    SetData(result);
});

var res = JSON.parse(localStorage.getItem("events"));
if(res){
    SetData(res)
}

function SetData(result){
    var wpos = 0;
    lastDate = null;
    $('.center').html("");
    result.forEach(el => {
        var temp = template;
        //transfers
        var op = el[1].op[1];
        if(el[1].op[0] == "transfer"){
            wpos++;

            if(op.to == mainAccount){
                temp = temp.replace("name_",op.from);
                temp = temp.replace("src_",AvatarURL+op.from+"/avatar")
                temp = temp.replace("style_","")
            }else{
                temp = temp.replace("name_",op.to);
                temp = temp.replace("src_",AvatarURL+op.to+"/avatar")
                temp = temp.replace("style_","color: #E31337")
            }
            temp = temp.replace("amount_",op.amount);
            temp = temp.replace("info_","Transfer");

            if(wpos == 10){
                AppendEvent(el[1],temp,true);
            }else{
                AppendEvent(el[1],temp,null);
            }
        }

        //Claim
        if(el[1].op[0] == "claim_reward_balance"){
            //console.log(op)
            var steem = parseFloat(op["reward_"+mainCurrency.toLowerCase()].split(" ")[0]);
            var sbd = parseFloat(op["reward_"+secCurrency.toLowerCase()].split(" ")[0]);

            if(steem > 0 && sbd > 0){
                if(sbd > 0){
                    temp = temp.replace("name_","Claim");
                    temp = temp.replace("info_","Claim reward");
                    temp = temp.replace("amount_",op["reward_"+secCurrency.toLowerCase()]);
                    temp = temp.replace("src_","./img/icons/star.png")
                    AppendEvent(el[1],temp);
                }
                if(steem > 0){
                    temp = template;
                    temp = temp.replace("name_","Claim");
                    temp = temp.replace("info_","Claim reward");
                    temp = temp.replace("amount_",op["reward_"+mainCurrency.toLowerCase()]);
                    temp = temp.replace("src_","./img/icons/star.png")
                    AppendEvent(el[1],temp);
                }
            }
        }
    });
}

var cnd = 0;
function AppendEvent(el,tmp,win=null){
    var date = new Date(el.timestamp);
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();

    if(year == curYear){
        year = "";
    }

    var tmpd = dateo;
    if(lastDate == null){
        $('.center').append(tmpd.replace("date_",day+" "+monthNames[month]+" "+year));
        lastDate = date.getTime();
    }

    if(parseInt(date.getTime()  / 86400000) < parseInt(lastDate / 86400000)){
        $('.center').append(tmpd.replace("date_",day+" "+monthNames[month]+" "+year));
    }
    lastDate = date.getTime();
    var el = $('.center').append(tmp).children("div:last-child");
    if(win){
        console.log("Set Win")
        el.click(function(){
            cnd++;
            if(cnd > 3){
                $('#headerh').text("#ilikepineapples")
            }
        })
    }
}