export default function socketHttpService($http, env, CONSTANTS){

    const DEFAULT_SOCKET_URL = '/api/socket';


    const startGetState = (connectSettings) => {
        return $http.get(env.socket + DEFAULT_SOCKET_URL + '/start', {
            params: {
                'host': connectSettings.host,
                'port': connectSettings.port,
                'pause': connectSettings.pause
            }
        });
    };

    const stopGetState = (uuid) => {
        return  $http.post(env.socket + DEFAULT_SOCKET_URL + '/stop', {
                           uuid: uuid
                       });
    }

    return {
    stopGetState : stopGetState,
        startGetState : startGetState
    };
}