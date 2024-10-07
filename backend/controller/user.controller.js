import User from "../model/user.model.js";
import {z} from "zod"; // used for schema validation
import bcrypt from "bcryptjs";
import { generateToken } from "../jwt/token.js";

// zod validation
const userValidation = z.object({
    username: z.string().min(3,{message: 'Username must have at least 3 characters'}),
    email: z.string().email({message: 'Invalid email', required: true}),
    password: z.string().min(8,{message: 'Password must have at least 8 characters', required: true}),
});

export const register = async (req,res)=>{
    console.log(`Signup function called`);

    const validationResult = userValidation.safeParse(req.body);
    if(!validationResult.success) {
        const errorMessage = validationResult.error.errors.map((err) => err.message);
        return res.status(400).json({
            message: "Invalid input",
            errors: errorMessage
        });
    }
    try {
        const { username, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) {
            res.status(400).json({
                message: "User already exists"
            })
        };
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashPassword});
        const savedUser = await user.save();
        if(savedUser) {
            
            res.status(201).json({
                message: `User sign up successful`, savedUser
            });
        }
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
    const user = await User.findOne({email}).select("+password");
    if(!user || !(await bcrypt.compare(req.body.password, user.password))) {
        res.status(400).json({message: "User does not exist"})
    } else {
        const token = generateToken(user);
        res.status(200).json({
            message: "login successful",
            token: token
        });
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error in sign-in"
        });
    }
}

export const logout=(req,res)=>{
    console.log(`logout function called`)
    res.status(200).json({
        message: "logout successful"
    });
}