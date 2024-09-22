class barcodeData{
    constructor(barcodeNumber,productName,ingridents,imageUrl,brand,catagories,IsItVegan,IsItVegitarian){
        this.barcode=barcodeNumber
        this.itemName = productName
        this.ingridents = ingridents
        this.images = imageUrl
        this.brand = brand
        this.catagories = catagories
        this.IsItVegan = IsItVegan
        this.IsItVegitarian = IsItVegitarian
        this.ToJSON()
    }
    ToJSON(){
        this.jsonData = {
            "barcodeNum":this.barcode,
            "data":{
                "item":this.itemName,
                "brand":this.brand,
                "images":this.images,
                "catagories":this.catagories,
                "ingredients":this.ingridents,
                "is-it-vegan":this.IsItVegan,
                "is-it-vegitarian":this.IsItVegitarian
            }
        }
    }
}
class itemData{
    constructor(barcode,itemName,brand,images,ingridents,catagories,IsItJain,IsItTithi,IsItVegan,IsItVegitarian,ReasonJain,ReasonTithi,ReasonVegan,ReasonVegitarian){
        this.barcode,this.itemName,this.brand,this.images,this.ingridents,this.catagories,this.IsItJain,this.IsItTithi,this.IsItVegan,this.IsItVegitarian,this.ReasonJain,this.ReasonTithi,this.ReasonVegan,this.ReasonVegitarian = barcode,itemName,brand,images,ingridents,catagories,IsItJain,IsItTithi,IsItVegan,IsItVegitarian,ReasonJain,ReasonTithi,ReasonVegan,ReasonVegitarian
        this.ToJSON()
    }
    ToJSON(){
        this.jsonData = {
            "barcodeNum":this.barcode,
            "data":{
                "item":this.itemName,
                "brand":this.brand,
                "images":this.images,
                "ingredients":this.ingridents,
                "catagories":this.catagories,
                "is-it-jain":this.IsItJain,
                "is-it-tithi":this.IsItTithi,
                "is-it-vegan":this.IsItVegan,
                "is-it-vegitarian":this.IsItVegitarian,
                "reason-jain":this.ReasonJain,
                "reason-tithi":this.ReasonTithi,
                "reason-vegan":this.ReasonVegan,
                "reason-vegitarian":this.ReasonVegitarian
            }
        }
    }
}
class ingridentsData{
    constructor(ingredientName,IsItVegan,IsItVegitarian,IsItJain,IsItTithi){
        this.ingredientName = ingredientName
        this.IsItJain = IsItJain
        this.IsItVegan = IsItVegan
        this.IsItVegitarian = IsItVegitarian
        this.IsItTithi = IsItTithi
        this.ToJSON()
    }
    ToJSON(){
        this.jsonData = {
            "ingredientName":this.ingredientName,
            "is-it-jain":this.IsItJain,
            "is-it-vegan":this.IsItVegan,
            "is-it-vegitarian":this.IsItVegitarian,
            "is-it-tithi":this.IsItTithi
        }
    }
}