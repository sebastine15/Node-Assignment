const http  =require ('http')
const { getAll, getSingle, createItem, putItem, deleteItem} = require('./controller')
const hostName = "localHost"
const Port = 8080 

function requestHandler (req, res){
   // getting the html file
   const {url, method} = req
   const id = Number(req.url.split('/')[2])
   if (url === '/items' && method === 'GET'){
     getAll(req, res)
   } 
   else if (url.startsWith('/items/') && method === 'GET'){
     getSingle(req, res, id)
    }
   else if(url === '/items' && method === 'POST'){
    createItem(req, res)
}
else if(url === '/items' && method === 'PUT'){
    putItem(req, res)
}
 else if (url.startsWith('/items/') && method === 'DELETE'){
  deleteItem(req, res, id)
  console.log("deleted")
 }
 }


const server = http.createServer(requestHandler)

server.listen(Port, hostName,()=>{
    console.log(`Server is running on http://${hostName}:${Port}`)
})