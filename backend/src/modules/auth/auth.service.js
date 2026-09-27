const User = require("../user/user.model");
const ApiError = require("../../utils/ApiError");
const generateToken = require("../../utils/generateToken");
const {
    fetchUserInfo
} = require("../codeforces/codeforces.service");

const registerUser = async({username, email, password})=>{

    const existingUser = await User.findOne({
        $or:[{username}, {email}]
    });

    if(existingUser){
        throw new ApiError(
            409,
            "Username or email already exists"
        );
    }

    const cfUsers = await fetchUserInfo(username);


    if (!cfUsers || cfUsers.length === 0) {

        throw new ApiError(
            400,
            "Invalid Codeforces username"
        );
    }

    const user = await User.create({
        username, 
        email,
        password
    });

    user.password = null;

    return user;
};

const loginUser = async({email, password})=>{

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(
            401,
            "Invalid email or password!"
        );
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new ApiError(
            401,
            "Invalid email or password!"
        );
    }

    const token = generateToken(user._id);

    user.password = null;

    return {
        user: user,
        token
    }
};

module.exports = {
    registerUser,
    loginUser
}