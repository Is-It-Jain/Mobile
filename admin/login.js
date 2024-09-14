var request = new XMLHttpRequest()
request.onload = () => {
    var KEY = request.responseText
    if(KEY=="NOTALLOWED"){
        window.location.replace("https://parshwa282011.github.io/item-brand/")
    }else if(KEY=="NOT IMPLEMENTED YET"){
        window.location.replace("https://parshwa282011.github.io/item-brand/")
    }else{
        window.location.replace("https://parshwa282011.github.io/admin/loggedIN/?key="+KEY)
    }
}
var url = new URL(widnow.location.herf)
var user = url.searchParams.get("user")
var pass = url.searchParams.get("pass")
request.open("GET","")