var express = require("express")
var mongodb = require('mongodb')
var isUrl = require('is-url' )
var shortid = require('shortid')
var MongoClient = mongodb.MongoClient
var originUrl = " "
var url2 = " "
var app = express()
var url = "mongodb://cptcanadiman:murphy79@ds155841.mlab.com:55841/urlshort"
//var url = process.env.MONGOLAB_URI

app.use(express.static('Public'))
app.get("/new/:URL(*)", function(req,res){
    url2 = req.params.URL
    
    if (isUrl(url2)) {
        var newshort = shortid.generate()
        //addData(url2,newshort)
        
        //Add user input url and shortened ID to DB
         MongoClient.connect(url, function(err, db){
    if (err) {
        console.log("Connection failed")
    } else {
        console.log("Connection to " + url + " established")
        var collection = db.collection('urlshort')
        
        var doc1 = {"original url":url2,"short_url":newshort}
        collection.insert(doc1);
    } 
    
        
    db.close()
    
    res.json({
        "original_url":url2,
        "short_url":newshort

    })
    
})
        
        //
        
        
    } else {
        //getData(url2)
        //Search for ID and return associated URL
        
        MongoClient.connect(url, function(err, db){
    if (err) {
        console.log("Connection failed")
    } 
        console.log("Connection to " + url + " established. Getting info ...")
        var collection = db.collection('urlshort')
         collection.findOne({short_url:url2}, function(err,data){
             if (err) throw err
             
             if (data===null) {
                 
                 res.json({"original url":"Not a valid address format"})
                 
             } else {
                 res.redirect(data['original url'])
             }
             
             db.close()
         })
       
        
        //
        
})
}
})


app.listen(process.env.PORT, function() {
    console.log("Running on Port 8080")
})