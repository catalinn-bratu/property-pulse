import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudinary';

// GET /api/properties
export const GET = async (request) => {
    try {
        await connectDB();
        const properties = await Property.find({});
        return new Response(JSON.stringify(properties), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Database error', { status: 500 });
    }
}

// POST /api/properties
export const POST = async (request) => {
    try {
        await connectDB();
        
        const sessionUser = await getSessionUser();

        if(!sessionUser||!sessionUser.userId){
            return new Response('User Id is required', { status: 401 });
        }

        const {userId} = sessionUser;
        const formData = await request.formData();
        
        // Access all values from amenities and images
        const amenities = formData.getAll('amenities');
        const imageFiles = formData.getAll('images').filter((image) => image.name !== '');

        // Create property object
        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zip: formData.get('location.zip'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates: {
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
                nightly: formData.get('rates.nightly'),
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner: userId
        };

        // Upload images to Cloudinary
        const imageUploadPromises = [];

        for(const imageFile of imageFiles){
            const imageBuffer = await imageFile.arrayBuffer();
            const imageArray = Array.from(new Uint8Array(imageBuffer));
            const imageData = Buffer.from(imageArray);

            // Convert the image data to base64
            const imageBase64 = imageData.toString('base64');
            
            // Make request to cloudinary
            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`,
                { folder: 'propertypulse' }
            );
            imageUploadPromises.push(result.secure_url);
        }

        // Wait for all images to upload
        const uploadedImages = await Promise.all(imageUploadPromises);
        
        // Add uploaded images to property data object
        propertyData.images = uploadedImages;

        // Create new property
        const newProperty = await Property.create(propertyData);
        
        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);

    } catch (error) {
        console.log(error);
        return new Response('Failed to add property', { status: 500 });
    }
}