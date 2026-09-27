const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["student", "admin"],
            default: "student"
        },

        profile: {
            college: {
                type: String,
                default: ""
            },

            bio: {
                type: String,
                default: ""
            },

            avatar: {
                type: String,
                default: ""
            }
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function() {
    
    if(!this.isModified("password")){
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
