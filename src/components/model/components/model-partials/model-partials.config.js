import carTemplate from './car/car.html';

export default function modelPartialsConfig($templateCache, CONSTANTS) {
    'ngInject';
    $templateCache.put(CONSTANTS.MODEL.CAR, carTemplate);
}
