$('#hover').click(function(el){
    if(el.target.id == "hover"){
        $('#hover').css("display","none")
    }
})

$('#hoverb').click(function(el){
    if(el.target.id == "hoverb"){
        $('#hoverb').css("display","none")
    }
})

$('#sell').click(function(){
    $('#hover').css("display","block")
})

$('#upload').click(function(){
    getPhoto(function(img){
        $('.upload').attr("src",img)
    })
})

$('#sellb').click(function(){
    var name = $('#name').val();
    var price = $('#price').val();
    var desc = $('#desc').val();
    var src = $( '.upload' ).attr('src');

    //!src.includes("icons/upload.png")
    var p = parseFloat(price.split(" ")[0]).toFixed(3);
    if(name != "" && price != "" && !src.includes("icons/upload.png") && desc !="" && !isNaN(p)){
        if(price.split(" ")[1].toLowerCase() == "hive" || price.split(" ")[1].toLowerCase() == "hbd"){
            var data, xhr;

            toDataUrl($( '.upload' ).attr('src'), function(myBase64) {
                    $.ajax({
                        url: server+"/sell",
                        type: "POST",
                        data: { "file": myBase64},
                        success: function(data) {
                            var id = data;
                            Transfer("swallet","0.001","HIVE",JSON.stringify({"type":"shop","id":id,"name":name,"price":price,"info":desc}));
                            $('#name').val("")
                            $('#price').val("");
                            $('#desc').val("");
                            $( '.upload' ).attr('src',"./img/icons/upload.png");
                            $('#hover').css("display","none")
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            alert(JSON.stringify(jqXHR));
                        }
                    });
            });
        }else{

        }
    }
})

var buyData = {};
var template = $('#eventtemp').html();
function loadOffers(){
    $.ajax({
        url: server+"/shop",
        type: "GET",
        success: function(data) {
            $('#items').html("");
            $('#mitems').html("");
            console.log(data)
            data.forEach(element => {
                if(element.price){
                    var tmp = template;
                    tmp = tmp.replace("name_",element.name)
                    tmp = tmp.replace("info_","Inserted by @"+element.from)
                    tmp = tmp.replace("amount_",parseFloat(element.price.split(" ")[0]).toFixed(3)+" "+element.price.split(" ")[1].toUpperCase())
                    tmp = tmp.replace("src_",server+"/img?id="+element.id)
                    tmp = tmp.replace('id_',element.id);

                    if(element.from == window.localStorage.getItem("mainuser")){
                        var insertedObj = $('#mitems').append(tmp)
                    }else{
                        var insertedObj = $('#items').append(tmp)
                    }
                    $('#'+element.id).click(function(){
                        $('#bimg').attr("src",server+"/img?id="+element.id)
                        $('#h2').html(parseFloat(element.price.split(" ")[0]).toFixed(3)+" "+element.price.split(" ")[1].toUpperCase())
                        $('#bh1').html(element.name)
                        $('#bd').html(element.info)
                        $('#hoverb').css("display","block")

                        if(element.from == window.localStorage.getItem("mainuser")){
                            $('#buyd').html("By clicking 'Delete!' i agree with the selling policy of sWallet!");
                            $('#buy').html("Delete!");
                            buyData = {id: element.id, price: "0.001 HIVE"}
                        }else{
                            $('#buyd').html("By clicking 'Buy!' i agree with the selling policy of sWallet!");
                            $('#buy').html("Buy!");
                            buyData = {id: element.id, price: element.price}
                        }
                    })
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
        }
    });
}

setInterval(function(){
    loadOffers();
},5000)

$('#buy').click(function(){
    Transfer("swallet",buyData.price.split(" ")[0],buyData.price.split(" ")[1].toUpperCase(),JSON.stringify({"type":"buy","id":buyData.id}));
    $('#hoverb').css("display","none")
})

loadOffers();