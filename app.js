const { error } = require('console');
const net = require('net')

let sockets = []

// creating a TCP server
const server = net.createServer((socket)=> {

    //array of all the sockets
    sockets.push(socket)

    //client connects
    console.log('Client connected');
    socket.write('You are connected to chat server\n');
    socket.write('Enter a msg:');

    //listening to end event
    socket.on('end' , () =>{
        console.log('client dis-connected!');
        sockets = socket.filter(s => s !== socket);
    })

    //reading what clients sends --> listening to 'data' event.
    socket.on('data', data => {
        console.log(`Client: ${data}`);
        for (let s of sockets){
            if(s !== socket){
                s.write(data);
            }
        }
    })
});

//handling error
server.on('error', (error)=> {
    console.log(error);
})

//listening to server on 3000
server.listen(3000,'10.0.0.239',()=> {
    console.log('Server running on port 3000')
})


//listening to server input
process.stdin.on('data', (data)=> {
    sockets.forEach((socket) =>{
        socket.write(`Server: ${data}`);
    })
})