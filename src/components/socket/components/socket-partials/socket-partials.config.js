import carTemplate from './car/car.html';

export default function socketPartialsConfig($templateCache, CONSTANTS) {
    'ngInject';
    $templateCache.put(CONSTANTS.SOCKET.CAR, carTemplate);
}
