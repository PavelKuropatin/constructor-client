const math = require('mathjs');

export default function imageHttpService ($http, env) {
  'ngInject';

  const DEFAULT_IMAGE_URL = '/api/image';

  const uploadImage = (image) => {
    let formData = new FormData();
    formData.append('image', image);
    console.log(formData);
    return $http.post(
      env.api + DEFAULT_IMAGE_URL + '/upload',
      formData,
      {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
      }
    );
  };

  const getImages = (size, next_cursor) => {
    return $http.get(env.api + DEFAULT_IMAGE_URL, {
      params: {
        size: size || 15,
        next_cursor: next_cursor || null
      }
    });
  };

  return {
    uploadImage: uploadImage,
    getImages: getImages
  };
}

