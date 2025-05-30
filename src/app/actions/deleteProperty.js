'use server';
import cloudinary from "@/config/cloudinary";
import  {connectDB}  from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
        throw new { error: "UserId is Required" };
    }
    
    const {userId} = sessionUser;

    await connectDB();

    const property = await Property.findById(propertyId);
    if (!property) {
        throw new { error: "Property not found" };
    }

    if (property.owner.toString() !== userId) {
        throw new { error: "You are not authorized to delete this property" };
    }

        //Extract public_id from the image URL
    const publicIds = property.images.map((imageUrl) => {
        const urlParts = imageUrl.split('/');
        return urlParts.at(-1).split('.').at(0);
    });

    //Delete images from cloudinary
    if (publicIds.length > 0) {
        for (let publicId of publicIds) {
            await cloudinary.uploader.destroy('LandSnatch/' + publicId);
        }
        
        
    }

    await property.deleteOne();

    revalidatePath('/', 'layout');

}

export default deleteProperty;