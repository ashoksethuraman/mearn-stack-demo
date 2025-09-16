import mongoose, { model, mongo, Schema } from "mongoose";

const FileSchema = new mongoose.Schema({
    filename: String,
    mimetype: String,
    size: Number,
    data: Buffer,   // binary file stored directly
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true // both start and end will trim
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email addresses are unique
        lowercase: true, // Converts email to lowercase before saving
        validate: {
            validator: function (email) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(email);
            },
            message: "please enter valide email address"
        }
    },
    password: {
        type: String,
        require: true,
        min: 5
    },
    dateOfBirth: { 
        type: Date,
        require: [true, "Date of Birth is required"]
    },
    file: FileSchema,
    createdAt: {
        type: Date,
        default: Date.now // Sets default value to current date/time
    }
});

// to add the  joining table subscripes with _id  to channelId in subscriber table
// UserSchema.virtual('subscribers', {
//   ref: 'Subscription',
//   localField: '_id',
//   foreignField: 'channelId',
//   justOne: false,
//   count: true,
//   match: { userId: this._id }
// });
const user = mongoose.model("Users", userSchema);


//  To  join the table 
// productId: {
//         type: mongoose.Schema.ObjectId,
//         ref:"user"

//     }

export { user };