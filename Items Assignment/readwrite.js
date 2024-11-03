// reading the files
const fs = require('fs')



function read (path){
  return new Promise((resolve, reject)=>{
    fs.readFile(path, "utf8", (err, data)=>{
        if(err){
            reject(err)
        } else{
            resolve(data)
        }
        })
        })
    
}

// writing the files
function write (path, data){
    return new Promise ((resolve, reject)=>{
        fs.writeFile(path, data,"utf8", (err)=>{
            if(err){
                reject(err)
            } else{
                resolve()
            }
        })
    })
}

module.exports = {read, write}