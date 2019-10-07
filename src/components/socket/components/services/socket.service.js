import SockJS from 'sockjs-client';

const Stomp = require('stompjs');


export default function socketService($q, $timeout, CONSTANTS, env) {
    const service = {}, listener = $q.defer(), socket = {
        client: null,
        stomp: null
    };

    service.RECONNECT_TIMEOUT = 30000;

    const receive = () => listener.promise;

    service.send = (message) => {
        socket.stomp.send(CONSTANTS.SOCKET.BROKER, {}, JSON.stringify({message: message}));
    };

//    const reconnect = () => {
//        $timeout(() => initSocket(), this.RECONNECT_TIMEOUT);
//    };
//
//    const startListener = () => {
//        socket.stomp.subscribe(CONSTANTS.SOCKET.TOPIC, (data) => {
//            listener.notify(data.body);
//        });
//    };

    const initSocket = (processor) => {
        var url = `${env.socket}${CONSTANTS.SOCKET.URL}`;

        socket.client = new SockJS(url);
        socket.stomp = Stomp.over(socket.client);

        socket.stomp.connect({}, () => {
            socket.stomp.subscribe(
                CONSTANTS.SOCKET.TOPIC,
                (data) => {
                   listener.notify(data.body);
                });
        });

        socket.stomp.onclose = () => {
            $timeout(() => initSocket(processor), this.RECONNECT_TIMEOUT);
        };
    };

//    initialize();
    return {
        initSocket : initSocket,
        receive : receive
    };
};