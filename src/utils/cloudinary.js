import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'


 // Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary= async (localFilePath) =>{

    try{
        if(!localFilePath) return null // can add the comment not found
      const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto"})
        // file has been uploaded successfully
        console.log("file is uplaod on cloundinary", response.url);
        return response;
    }catch(error){
        fs.unlinkSync(localFilePath) // remove local save temperary file as uploaded operation failed
        return null;
        
    }

}