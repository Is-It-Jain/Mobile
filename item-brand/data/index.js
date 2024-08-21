const url="http://73.97.237.79:8000";
function getData(){
    var request = new XMLHttpRequest()
    request.responseText = "text/plain"
    request.onload = (res) => {
        console.log(JSON.parse(request.responseText))
        loadpage(JSON.parse(request.responseText))
    }
    request.open("GET",url+"/?query="+document.getElementById("q").innerHTML)
    request.send()

}
function GETData(){
    window.location.replace(window.location.href+"?query="+document.getElementById("query").value)
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
    console.log("loaded")
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
    for(i in data){
        parts = ""
        for(k in data[i]){
            parts += "<td>"+data[i][k]+"</td>"
        }
        rows += "<tr id=\"datarow\">"+parts+"</tr>"
        console.log(parts)
    }
    console.log(rows)
    document.getElementById("toprow").outerHTML = rows
}