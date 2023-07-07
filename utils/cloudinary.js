const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dd1y089s0', 
  api_key: '634192681127148',
  api_secret: "uGMf6lqggQ2SCJ9nWUB3KyyXStw",
});

const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(fileToUploads, (result) => {
      console.log(result)
      resolve(
        {
          url: result.url,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

module.exports = cloudinaryUploadImg
