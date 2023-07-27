const http=require('http');
const path=require('path');
const fs=require('fs');
const { Server } = require("socket.io");

const server=http.createServer((req,res)=>{
  if(req.url==='/'){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile(path.join(__dirname,'/public/index.html'),'utf-8',(err,data)=>{
      if(err)throw err;
      else 
      res.end(data)
    })
  }else{
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }

})
const io = new Server(server);
io.on('connection', (socket) => {
  socket.on('chat message',(msg)=>{
io.emit('chat message',msg)
  })
  console.log('a user connected');
});

server.listen(7001,()=>{
  
    console.log('Server is running on port 7001');
})