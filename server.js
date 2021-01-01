var fs=require("fs")
var data= fs.readFileSync("databases.json");
var db=JSON.parse(data)
const bodyparser=require("body-parser")
var express=require("express");
var app= express()
var server = app.listen(5000,()=>{console.log("listing")});
console.log("server is runnig and testing if l is being double clicked lll")
app.use(express.static("website"))
app.use(bodyparser.json())

// getting all the datas in database.json file
app.get("/table",(req,res)=>{res.send(db)})


// delete a data in database.json file
app.delete("/table/:key",(req,res)=>{
    var data=req.params;
    var key=data.key;
    db["data"] = db["data"].filter((okey) => okey["id"]!==key);
    var newdb=JSON.stringify(db)
    fs.writeFileSync("databases.json",newdb,()=>{res.send(db)})
    res.send(newdb)
    console.log("delete has been used",key,newdb)
})


// posting a new value
app.post("/table",(req,res)=>{
    var key=req.body.id;
    var value=req.body.data;
    console.log(key,value)
    var flg=0;
    for (var i=0;i<db["data"].length;i++){
      if (db["data"][i].id===key){
          flg=1
          break
      }
  }
  if(flg===0){
      db["data"].push({
        "id":key,
        "data":value
    })
    var newdb=JSON.stringify(db)
    fs.writeFileSync("databases.json",newdb,()=>{res.send(db)})
    res.send(newdb)
  }
  else{
    res.status(400).send("error")
  }
})



