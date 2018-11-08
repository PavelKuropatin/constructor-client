export default function uuidService() {
  let lastUUID = 2000;

  const getNextUUID = () => {
    lastUUID++;
    return lastUUID;
  };

  return {
    getNextUUID: getNextUUID
  };
}

