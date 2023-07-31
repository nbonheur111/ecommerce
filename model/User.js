import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true,
    },
    password: {
        type: String, 
        required: true,
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        }
    ],
    wishlists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Wishlist',
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false
    },

    hasShippingAddress: {
        type: Boolean,
        default: false
    },
    shippingAddress: {
        firstName: {
            type: String,
        },
        firstName: {
            type: String,
        },
        address: {
            tyep: String,

        },
        city: {
            tyep: String,
            
        },
        state: {
            tyep: String,
            
        },
        zipcode: {
            tyep: String,
            
        },
        country: {
            tyep: String,   
        },
        phone: {
            tyep: String,
            
        }
    }
},
{
    timestamps: true,
}
);
//compile the schema to model

const User = mongoose.model('User', UserSchema);
export default User;