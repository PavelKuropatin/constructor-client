export default function uuidService() {
  let lastUUID = 2000;

  const getNextUUID = function () {
    lastUUID++;
    return lastUUID;
  };

  return {
    getNextUUID: getNextUUID
  };
}

