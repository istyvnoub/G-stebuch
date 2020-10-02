"use strict"

let express = require("express");
let fs=require("fs")
let bodyParser=require("body-parser");
let GuestBookentry= require("./src/Guestbookentry")


fs.readFile("./data.json","utf-8",(err,data)=>{
    if(err) throw err;
    let d=JSON.parse(data);
    let entries=[]
    for(let entry of d){
        entries.push(new GuestBookentry(entry.title,entry.content))
    }

    //Server startet
    let app=express();
app.set("view engine","ejs")
app.set("views","./views");

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("./public"))


app.get("/index",(req,res)=>{
    res.render("index",{
        entries:entries
    })
})

app.post("/guestbook/new",(req,res)=>{
    let content=req.body.content
    let title=req.body.title

    let guestbook=new GuestBookentry(title,content);
    entries.push(guestbook);

    //Schreibe in der Datei
    fs.writeFileSync("./data.json",JSON.stringify(entries));

    res.redirect("/index");
    res.end();
})
app.listen(5000,()=>{
    console.log("Wurde gestartet auf localhost:5000")
})

    
})

