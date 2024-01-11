const { WebSocketServer, WebSocket } = require('ws');
const wss = new WebSocketServer({ port: 3000 });


wss.on('connection', ws => {
    console.log("cliente conectado");

    ws.send("Hola cliente");

    ws.on("close", () => {
        console.log("cliente desconectado");
    })

    ws.on("message", data => {
        console.log("dato recibido %s", data)

        // broadcast
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send("Hola cliente conectado");
            }
        });
    });
});