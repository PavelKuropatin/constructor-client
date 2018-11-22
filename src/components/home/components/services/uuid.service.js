export default function uuidService() {
  'ngInject';

  let lastUUID = 2000;

  const getNextUUID = () => {
    lastUUID++;
    return lastUUID;
  };

  return {
    getNextUUID: getNextUUID
  };
}

