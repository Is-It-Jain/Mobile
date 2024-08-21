const url="https://us-west-2.aws.data.mongodb-api.com/app/barcode-ofdsbkb/endpoint/api";
function getData(){
    var request = new XMLHttpRequest()
    request.responseText = "text/plain"
    request.onload = (res) => {
        loadpage(JSON.parse(request.responseText))
    }
    request.open("GET",url+"?q="+document.getElementById("q").innerHTML)
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
    window.location.replace("http://"+window.location.host+"/barcode")
}
function toitembrand(){
    window.location.replace("http://"+window.location.host+"/item-brand")
}
function loadpage(data){
    startrow = "<tr id=\"datarow\"></tr>"
    rows = document.getElementById("toprow").outerHTML
    rows2 = document.getElementById("toprow2").outerHTML
    console.log(rows)
    console.log(rows2)
    for(i in data){
        parts = ""
        parts2 = ""
        var a = 0
        for(k in data[i]){
            a += 1;
            if(a<4){
                parts += "<td>"+data[i][k]+"</td>";
            } else if(a<6){
                parts2 += "<td>"+data[i][k]+"</td>"
            } else {
                parts2 += "<td><img src="+data[i][k][0]+"></img></td>"
            }
        }
        rows += "<tr id=\"datarow\">"+parts+"</tr>"
        rows2 += "<tr id=\"datarow\">"+parts2+"</tr>"
    }
    document.getElementById("toprow").outerHTML = rows
    document.getElementById("toprow2").outerHTML = rows2
    console.log(rows)
    console.log(rows2)
}