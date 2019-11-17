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
                       headers: {'Content-Type': undefined}
         }
         );
   };

    const getImages = () => {
        return $http.get(env.api + DEFAULT_IMAGE_URL);
      };


  return {
    uploadImage: uploadImage,
    getImages: getImages
  };
}

