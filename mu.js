var http= require('http');
var data=[
    {name:"Ajit",Age:"24",Email:"ajitkumar108@gmail.com"},
    {name:"saurahsir",Age:"34",Email:"saurkumar108@gmail.com"},
    {name:"mukul",Age:"24",Email:"mukulkumar108@gmail.com"},
    {name:"patsa",Age:"24",Email:"ajdjkumar108@gmail.com"},
    {name:"Ajdj",Age:"24",Email:"adjdtkumar108@gmail.com"}
]
http.createServer(function(req,res){
  res.writeHead(200,{'Content-Type':'application\json'})
res.write(JSON.stringify(data));
res.end();    
}).listen(3800)