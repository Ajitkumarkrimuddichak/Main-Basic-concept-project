const http = require("http");
const fs = require("fs");

const server = http.createServer((req,res) =>{
    if (req.url == "/") {
        res.end("Ajit from the home sides");
    } else if (req.url == "/about") {
        res.end("Mukul from the Aboutus sides"); 
    } else if (req.url == "/contact") {
        res.end("Rakesh from the contactus sides ");
    } else if (req.url == "/API") {
        fs.readFile(`${__dirname}/API/ajit.json`, "utf-8",(err,data) => {
            console.log(data);
        });
        res.end("Bhushan from the userAPI sides");
    } else {
        res.writeHead(404, { "Content-type": "text/html" });
        res.end("<h1> 404 error pages. Page does't exist</h1>");
    }
});

server.listen(8000,"127.0.0.1", () => {
    console.log("listening to the port no 8000");
});