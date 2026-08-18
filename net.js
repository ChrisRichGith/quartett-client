export let socket;

export function connect(onMessage) {
    socket = new WebSocket("ws://localhost:8080");

    socket.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        onMessage(data);
    };
}

export function send(obj) {
    socket.send(JSON.stringify(obj));
}
socket.onopen = () => {
    socket.send(JSON.stringify({
        type: "join",
        name: localStorage.getItem("playerName"),
                               code: localStorage.getItem("sessionCode")
    }));
};
