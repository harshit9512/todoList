import User from "../model/user.model.js";

export const register = async (req,res)=>{
    console.log(`Signup function called`);
    const email = req.body.email;
    const existingUser = await User.findOne({email});
    if(existingUser) {
        res.status(200).json({
            message: "User already exists"
        })
    };
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.status(201).json({
            message: `User sign up successful`, savedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `error in sign-up`
        });
    }
}

export const login = async(req,res)=>{
    console.log(`login function called`)
    try {
    const email = req.body.email;
    const user = await User.findOne({email});
    if(!user || !user.password.match(req.body.password)) {
        res.status(200).json({message: "User does not exist"})
    }
    res.status(200).json({
        message: "sign-in successful"
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error in sign-in"
        });
    }
}

export const logout=(req,res)=>{
    console.log(`logout function called`)
}