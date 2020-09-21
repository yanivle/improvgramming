let idText = document.querySelector("#peerjsId");
idText.value = 'Getting id from server...';
var peer = new Peer();
peer.on('error', (error) => {
    console.error(error);
});
peer.on('open', function (id) {
    idText.value = id;
});
var theConn = null;
peer.on('connection', function (conn) {
    theConn = conn;
    setupConn();
});

export function send(type, payload) {
    if (theConn != null && theConn.open) {
        theConn.send({'type': type, 'payload': payload});
    }
}

var receiveHandlers = {};
export function registerReceiveHandler(type, cb) {
    console.log('registering handler for', type);
    receiveHandlers[type] = cb;
}

function setupButtons() {
    let connectButton = document.querySelector("#connect");
    connectButton.onclick = function () {
        console.log('Connecting to:', idText.value);
        theConn = peer.connect(idText.value);
        window.conn = theConn;
        setupConn();
    }
}

function setupConn() {
    console.log('Setting up connection...');
    theConn.on('error', function (err) {
        console.log(err);
    });
    theConn.on('open', function () {
        console.log('Connected!');
        theConn.on('data', function (data) {
            // console.log('Received', data);
            let type = data['type'];
            let payload = data['payload'];
            // console.log(type, payload);
            if (type in receiveHandlers) {
                // console.log('handler found');
                receiveHandlers[type](payload);
            } else {
                console.log('handler not found', receiveHandlers);
            }
        });
    });
}

setupButtons();
