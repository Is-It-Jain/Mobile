const url="https://us-west-2.aws.data.mongodb-api.com/app/barcode-ofdsbkb/endpoint/api";
const url2="https://world.openfoodfacts.org/api/v2/product/"
const creaateItemurl="https://us-west-2.aws.data.mongodb-api.com/app/barcode-ofdsbkb/endpoint/api/v1/items";
function loadpage(data){
    console.log(data)
    rows = document.getElementById("toprow").outerHTML
    console.log(rows)
    for(i in data){
        parts = ""
        var a = 0
        for(k in data[i]){
            a += 1;
            if (a==1) {
                parts += "<td id=\"colums14\"><img width=100 height=100 src="+data[i]["images"][0]+"></img></td>";
            } else if(a==2){
                parts += "<td id=\"colums14\">"+data[i]["brand"]+"</td>";
            } else if(a==3){
                parts += "<td id=\"colums14\">"+data[i]["item"]+"</td>";
            } else if(a==4){
                parts += "<td id=\"colums14\">"+data[i]["Is_It_Jain?"]+"</td>";
            } else if(a==5){
                if(data[i]["Ingredients"] == undefined || data[i]["Ingredients"] == null){
                    parts +="<div style=\"display:block\"id=\"ING-less-"+i+"\">Unaware of Ingredients</div>"
                            +"</td>";
                } else {
                    parts += "<td id=\"colums56\"><div style=\"display:none\"id=\"ING-more-"+i+"\">"+data[i]["Ingredients"]
                                +" <a class=\"larger\" id=\"a-ING"+i+"\"onclick=\"showLessIngredients('"+i+"')\">Show less</a></div>"+"</div>";
                    parts +="<div style=\"display:block\"id=\"ING-less-"+i+"\">"+data[i]["Ingredients"].substring(0,20)
                                +"...<a class=\"larger\" id=\"a-ING"+i+"\"onclick=\"showMoreIngredients('"+i+"')\">Show more</a></div>"
                            +"</td>";
                }
            } else if(a==6){
                if (data[i]["Reason"] != undefined) {
                    parts += "<td id=\"colums56\">"+data[i]["Reason"]+"</td>";
                } else if (data[i]["reason-non-jain"] != undefined) {
                    parts += "<td id=\"colums56\">"+data[i]["reason-non-jain"]+"</td>";
                }
            }
        }
        rows += "<tr id=\"datarow\">"+parts+"</tr>";
    }
    document.getElementById("toprow").outerHTML = rows
    console.log(rows)
}
function runBarcodeAPI(code1,code2){
    var request1 = new XMLHttpRequest();
    var request2 = new XMLHttpRequest();
    var time = 1;
    request1.responseText = "text/plain";
    request2.responseText = "text/plain";
    request1.onload = (res) => {
        if(JSON.parse(request1.responseText)["status"]==0 && time==1){
            request1.open("GET",url2+code2);
            request1.send();
            time=2;
        }else if(JSON.parse(request1.responseText)["status"]==0&&time==2){
            console.log("no item");
            alert("item doesnt exist");
        } else {
            console.log(JSON.parse(request1.responseText));
            data = JSON.parse(request1.responseText);
            var categories = data["product"]["categories_tags"];
            var itemCategories = "";
            for (i=0; i< categories.length; i++) {
                itemCategories += categories[i].substring(3).replace("-", " ") + ", ";
            }
            data2 = {
                "barcode":data["code"],
                "data":{
                    "categories":itemCategories,
                    "images":[data["product"]["image_url"]],
                    "ingredients":data["product"]["ingredients"],
                    "name":data["product"]["product_name_en"],
                    "brand":data["product"]["brands"],
                    "ingredients_en":data["product"]["ingredients_text_en"]
                }
            };
            request2.open("POST",creaateItemurl);
            time = 1;
            request2.send(JSON.stringify(data2));
        }
    }
    request2.onload = (res) => {
        loadpage(JSON.parse(request2.responseText));
    }
    request1.open("GET",url2+code1);
    request1.send();
}
function getData(mode){
    var request = new XMLHttpRequest();
    request.responseText = "text/plain";
    request.onload = (res) => {
        if(request.responseText=="{}"){
            runBarcodeAPI(code,code2);
        } else {
            loadpage(JSON.parse(request.responseText));
        }
    }
    var code = document.getElementById("q").innerHTML.toLowerCase();
    var code2 = code.substring(1);
    request.open("GET",url+"?q="+code);
    request.send();
}
function GETData(){
    if(window.location.search != undefined){
        window.location.replace(window.location.href.split("?")[0]+"?query="+document.getElementById("query").value);
    }
}
function bodyonload(){
    var weburl = new URL(window.location.href)
    if(weburl.searchParams.has("query")){
        document.getElementById("q").innerHTML = weburl.searchParams.get("query");
        outputarea.style.visibility = "visible";
        item.innerHTML = weburl.searchParams.get("query");
        if(weburl.searchParams.get("double").toString()=="1"){
            getData("upc?");
        }else{
            getData("ean");
        }
    }else{
        outputarea.style.visibility = "hidden";
    }
}
function tobarcode(){
    window.location.replace("http://"+window.location.host+"/Mobile/barcode")
}
function toitembrand(){
    window.location.replace("http://"+window.location.host+"/Mobile/item-brand")
}
function showMoreIngredients(id) {
    var showMore = document.getElementById("ING-more-"+id);
    if (showMore.style.display === "none") {
        showMore.style.display = "block";
    }

    var showLess = document.getElementById("ING-less-"+id);
    if (showLess.style.display === "block") {
        showLess.style.display = "none";
    }
}

function showLessIngredients(id) {
    var showMore = document.getElementById("ING-more-"+id);
    if (showMore.style.display === "block") {
        showMore.style.display = "none";
    }

    var showLess = document.getElementById("ING-less-"+id);
    if (showLess.style.display === "none") {
        showLess.style.display = "block";
    }
}