const barcodeAPIURL = "https://world.openfoodfacts.org/api/v2/product/"
const barcodePOSTURL = ""
const barcodeGETURL = ""
function check(i){
    var vegan = true
    var vegitarian = true
    if(i["ingredients"]){
        for(j in i["ingredients"]){
            var veganC,vegitarianC = check(j)
            if(!veganC){
                vegan = false
            }
            if(!vegitarianC){
                vegitarian = false
            }
        }
    }
    return vegan,vegitarian

}
function formatize(type,data){
    if(type == "barcodeData"){
        var IsItVegan = true
        var IsItVegitarian = true
        for(i in data["product"]["ingredients"]){
            var vegan,vegitarian = check(i)
            if(!vegan){
                IsItVegan = false
            }
            if(!vegitarian){
                IsItVegitarian = false
            }
        }
        var barcodedat = barcodeData(data["code"],
        data["product"]["product_name"],
        data["product"]["ingredients"],
        data["product"]["image_url"],
        data["product"]["brands"],
        data["product"]["categories"],
        IsItVegan,
        IsItVegitarian)
        return barcodedat.jsonData
    }/*else if(type == "itemData"){
        itemData(barcode,
            itemName,
            brand,
            images,
            ingridents,
            catagories,
            IsItJain,
            IsItTithi,
            IsItVegan,
            IsItVegitarian,
            ReasonJain,
            ReasonTithi,
            ReasonVegan,
            ReasonVegitarian)
        return barcodedat.jsonData
    }*/else{
        return "NOT VALID"
    }
}
function postToServer(data){
    var request = new XMLHttpRequest()
    request.onload = () => {
        var loaded = loadpage(JSON.parse(request.responseText))
        return loaded
    }
    request.open("POST",barcodePOSTURL)
    request.send(JSON.stringify(data))
}
function APIRequest(barcode){
    var request = new XMLHttpRequest()
    request.onload = () => {
        if(JSON.parse(request.responseText)["status"] == 0){
            console.log("NO ITEM")
            return null
        }
        data = formatize("barcodeData",JSON.parse(request.responseText))
        if(data != "NOT VALID"){
            var status = postToServer(data)
            return status
        }
    }
    request.open("GET",barcodeAPIURL+barcode)
    request.send()
}
function getFromServer(barcode,double){
    var request = new XMLHttpRequest()
    request.onload = () => {
        if(request.responseText == JSON.stringify({})){
            APIRequest(barcode)
        }else{
            loadpage(JSON.parse(request.responseText))
        }
    }
    request.open("POST",barcodeGETURL+"?barcode="+barcode)
    request.send()
}