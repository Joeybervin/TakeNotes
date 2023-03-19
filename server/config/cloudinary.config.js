const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUND_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = async (publicId, newImageFilePath) => {
    const uploadOptions = {
        public_id: publicId,
        overwrite: true,
        resource_type: 'image'
    };


    const image = await cloudinary.uploader.upload(
        newImageFilePath, uploadOptions, 
        (result) => result
    );
    return image;
};


module.exports = { upload };