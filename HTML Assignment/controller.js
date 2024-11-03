
const path = require('path')
const {read} = require('./readwrite')

// geting the html file
async function getHTML (req, res) {
    if (req.url === '/'|| req.url === '/index.html') {
        const filePath = path.join(__dirname, 'index.html')
        const data = await read(filePath)
        try{
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(data)
        }
        catch{
            res.writeHead(500, {'Content-Type': 'text/html'})
            res.end('<h1>500 Internal Server Error</h1>')
        }
} else {
    const filePath = path.join(__dirname, 'error.html')
    const data = await read(filePath)
    try{
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end(data)
    }
    catch{
        res.writeHead(500, {'Content-Type': 'text/html'})
        res.end('<h1>500 Internal Server Error</h1>')
    }
    }
}



module.exports = {
    getHTML
}