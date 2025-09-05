import {Schema, model, models} from 'mongoose';

const PropertySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        },
    name: {
        type: String,
        required: [true, 'Property name is required'],
    },
    type: {
        type: String,
        required: [true, 'Property type is required'],
    },
    description: {
        type: String,
    },
    location: {
        street:{
          type: String,  
        },
        city:{
            type: String,
        },
        state:{
            type: String,
        },
        zipcode:{
            type: String,
        },
    },
    beds:{
        type: Number,
        required: [true, 'Number of beds is required'],
    },
    baths:{
        type: Number,
        required: [true, 'Number of baths is required'],
    },
    square_feet:{
        type: Number,
        required: [true, 'Square feet is required'],
    },
    amenities:[
        {
            type: String,
        }
    ],
    rates:{
        nightly:{
            type: Number,
            
        },
        weekly:{
            type: Number,
        },
        monthly:{
            type: Number,
        }
    },
    seller_info:{
        name:{
            type: String,
        },
        email:{
            type: String,
        },
        phone:{
            type: String,
        }
    },
    images:[
        {
            type: String,
        }
    ],
    is_featured:{
        type: Boolean,
        default: false,
    }
}, 
{
    timestamps: true
}
);


const Property = models.Property || model('Property', PropertySchema);

export default Property;    