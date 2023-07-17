const { error } = require('console');
const net = require('net')

 

let clients = {}

// creating a TCP server
const server = net.createServer((socket)=> {
    socket.write('You are connected to chat server\n');
    socket.write('Please enter a username:');

    let username = null;

    //listening to end event
    socket.on('end' , () =>{
        console.log(`Client ${username} dis-connected!`);
        delete clients[username];
    })

    //reading what clients sends --> listening to 'data' event.
    socket.on('data', data => {
        // If username is not set, the first message is the username
        if (!username) {
            username = data.toString().trim();
            clients[username] = socket;
            console.log(`User ${username} joined the chat`);
        } else {
            console.log(`${username}: ${data}`);
            for (let user in clients){
                if(user !== username){
                    clients[user].write(`${username}: ${data}`);
                }
            }
        }
    })
});

//handling error
server.on('error', (error)=> {
    console.log(error);
})

//listening to server on 3000
server.listen(3000,'192.168.2.126',()=> {
    console.log('Server running on port 3000')
})

//listening to server input
process.stdin.on('data', (data)=> {
    for (let user in clients){
        clients[user].write(`Server: ${data}`);
    } 
})