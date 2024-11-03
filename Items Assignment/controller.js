const path = require('path')
const {read, write} = require('./readwrite')
const fs = require('fs')
const { console } = require('inspector')
const filepath = path.join(__dirname, 'items.json')


async function getAll (request, response){
    
    try{
        const data = await read (filepath)
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.end(data)
        } catch{
            response.writeHead(500, {'Content-Type': 'application/json'})
            response.end("internal server error")
        }
}


async function getSingle (request, response, id){
   
    try{
        const file = await read (filepath ,)
        const data = JSON.parse(file)
        const items = data.items
        const item = items.find(item => item.id === id)
        if(item){
            response.writeHead(200, {'Content-Type': 'application/json'})
            response.end(JSON.stringify(item))
        } else{
            response.writeHead(404, {'Content-Type': 'application/json'})
            response.end("item not found wrong id")
        }


    } catch{
        response.writeHead(500, {'Content-Type': 'application/json'})
        response.end("error in getting the data")

    }

}
async function createItem (req , res){
    try{
        let body = []
        req.on("data", (chunk) => {
            body.push(chunk);   
        });
        req.on("end", async () =>{
            const post = Buffer.concat(body).toString();
            const parsedPost = JSON.parse(post);
            const file = await read(filepath)
            const data = JSON.parse(file)
            const items = data.items
            const newId = items.length + 1
            parsedPost.id = newId
            items.push(parsedPost)
            data.items = items
            const stringedData = JSON.stringify(data)
            await write(filepath, stringedData)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(stringedData)
        })

    }catch{
        res.writeHead(500, {'Content-Type': 'application/json'})
        res.end("internal server error")
    }
}

async function putItem(req, res) {
   try {
       let body = [];
       req.on("data", (chunk) => {
           body.push(chunk);
       });

       req.on("end", async () => {
           try {
               body = Buffer.concat(body).toString();
               body = JSON.parse(body);

               const bodyId = body.id;
               const file = await read(filepath);
               const data = JSON.parse(file);
               const items = data.items;
               const itemIndex = items.findIndex(item => item.id === bodyId);
              

               if (itemIndex === -1) {
                   res.writeHead(404, {'Content-Type': 'application/json'});
                   return res.end(JSON.stringify({ message: "Item not found, wrong ID" }));
               }

               items[itemIndex] = { ...items[itemIndex], ...body };
               data.items = items;
               const stringedData = JSON.stringify(data);

               await write(filepath, stringedData);

               res.writeHead(200, {'Content-Type': 'application/json'});
               res.end(stringedData);
           } catch (err) {
               res.writeHead(500, {'Content-Type': 'application/json'});
               res.end(JSON.stringify({ message: "Internal server error" }));
           }
       });
   } catch (err) {
       res.writeHead(500, {'Content-Type': 'application/json'});
       res.end(JSON.stringify({ message: "Internal server error" }));
   }
}

   async  function deleteItem (req, res, id){
    try{
        const file = await read(filepath);
               const data = JSON.parse(file);
               const items = data.items;
               const itemIndex = items.findIndex(item => item.id === id);
              

               if (itemIndex === -1) {
                   res.writeHead(404, {'Content-Type': 'application/json'});
                   return res.end(JSON.stringify({ message: "Item not found, wrong ID" }));
               }

               items.splice(itemIndex, 1);
               data.items = items;
               const stringedData = JSON.stringify(data);

               await write(filepath, stringedData);
               res.writeHead(200, {'Content-Type': 'application/json'});
               res.end(stringedData);
           } catch (err) {
               res.writeHead(500, {'Content-Type': 'application/json'});
               res.end(JSON.stringify({ message: "Internal server error" }));
           }
}





module.exports = {
    getAll, getSingle,createItem, putItem, deleteItem}