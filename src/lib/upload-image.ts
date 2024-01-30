import cloudinary from "./cloudinary"

export const UploadImage = async (file: File, folder: string) => {
    const buffer = await file.arrayBuffer()
    const byte = Buffer.from(buffer)
    return new Promise(async (resolve, reject) => {
      await cloudinary.uploader.upload_stream({
        resource_type: "auto",
        folder: folder
      }, async (err: any, result: any) =>{
        if(err){
           return reject(err.message)
        }
        return resolve(result)
      }).end(byte)
    });
  };
  