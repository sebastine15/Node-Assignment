const http  =require ('http')
const { getHTML } = require('./controller')
const hostName = "localHost"
const Port = 8000 

function requestHandler (req, res){
   // getting the html file
   getHTML(req, res)
}



const server = http.createServer(requestHandler)

server.listen(Port, hostName,()=>{
    console.log(`Server is running on http://${hostName}:${Port}`)
})