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
    startrow = "<tr id=\"datarow\"></tr>"
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
                parts += "<td id=\"colums56\">"+data[i]["Ingredients"]+"</td>";
            } else if(a==6){
                parts += "<td>"+data[i]["Reason"]+"</td>";
            }
        }
        rows += "<tr id=\"datarow\">"+parts+"</tr>";
    }
    document.getElementById("toprow").outerHTML = rows
    console.log(rows)
}