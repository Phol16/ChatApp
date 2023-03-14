import cloudinary from 'cloudinary'

export class CloudinaryService {
  static cloudinaryName = 'CloudinaryService';

  constructor(cloudName, apiKey, apiSecret){
    this.cloudinary = cloudinary.v2
    this.cloud_Name = cloudName
    this.api_Key = apiKey
    this.api_Secret = apiSecret
    this.config = this.cloudinary.config({
      cloud_name: this.cloud_Name,
      api_key: this.api_Key,
      api_secret: this.api_Secret,
    })
  }

  get uploader(){
    return this.cloudinary.uploader;
  }

}