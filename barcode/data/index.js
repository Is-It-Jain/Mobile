const url="https://us-west-2.aws.data.mongodb-api.com/app/barcode-ofdsbkb/endpoint/api";
function getData(){
    var request = new XMLHttpRequest()
    request.responseText = "text/plain"
    request.onload = (res) => {
        loadpage(JSON.parse(request.responseText))
    }
    request.open("GET",url+"?q="+document.getElementById("q").innerHTML.toLowerCase())
    request.send()
}
function GETData(){
    if(window.location.search != undefined){
        window.location.replace(window.location.href.split("?")[0]+"?query="+document.getElementById("query").value)
    }
}
function bodyonload(){
    var weburl = new URL(window.location.href)
    if(weburl.searchParams.has("query")){
        document.getElementById("q").innerHTML = weburl.searchParams.get("query")
        outputarea.style.visibility = "visible";
        item.innerHTML = weburl.searchParams.get("query")
        getData()
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
function loadpage(data){
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
                parts += "<td id=\"colums56\"><div style=\"display:none\"id=\"ING-more-"+i+"\">"+data[i]["Ingredients"]
                                +" <a class=\"larger\" id=\"a-ING"+i+"\"onclick=\"showLessIngredients('"+i+"')\">Show less</a></div>"+"</div>"
                            + "<div style=\"display:block\"id=\"ING-less-"+i+"\">"+data[i]["Ingredients"].substring(10)
                                +"...<a class=\"larger\" id=\"a-ING"+i+"\"onclick=\"showMoreIngredients('"+i+"')\">Show more</a></div>"
                            +"<a class=\"larger\" id=\"ING"+i+"\"onclick=\"showING('"+data[i]["Ingredients"]+"','"+i+"')\">Show Ingredients</a></td>";
            
            } else if(a==6){
                parts += "<td id=\"colums56\">"+data[i]["Reason"]+"</td>";
            }
        }
        rows += "<tr id=\"datarow\">"+parts+"</tr>";
    }
    document.getElementById("toprow").outerHTML = rows
    console.log(rows)
}
function showING(dat,id){
    outerHTML = document.getElementById("ING"+id).outerHTML
    outerHTML = "<div id=\"ING"+id+"\">"+dat+"</div><a class=\"larger\" id=\"ING"+id+"2\"onclick=\"hideING('"+id+"')\">Hide Ingredients</a>"
    document.getElementById("ING"+id).outerHTML = outerHTML
}
function hideING(id){
    outerHTML = document.getElementById("ING"+id+"2").outerHTML
    dat = document.getElementById("ING"+id).innerHTML
    document.getElementById("ING"+id+"2").outerHTML = "<a class=\"larger\" id=\"ING"+id+"\"onclick=\"showING('"+dat+"','"+id+"')\">Show Ingredients</a>"
    document.getElementById("ING"+id).outerHTML = ""
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