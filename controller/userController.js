import { error } from "console";
import User from "../model/userModel.js";

// Create a new user
export const create = async (req, res) => {
    try {
        const { email } = req.body; // Extract email from request body
        const userExist = await User.findOne({ email }); // Find if the user already exists

        if (userExist) {
            return res.status(400).json({ message: "User already exists." });
        }

        const userData = new User(req.body); // Create new user with request body data
        const savedUser = await userData.save(); // Save the new user in the database

        return res.status(201).json(savedUser); // Return the saved user with status 201
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error." });
    }
};

// Fetch a basic response
export const fetch = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length==0){
            return res.status(400).json({ error: "User not found." });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error." });
    }
};


export const update = async(req,res)=>{
    try{
        const id=req.params.id;
        const userExist=await User.findOne({_id:id})
        if(!userExist){
           return res.status(404).json({error: "User not found"});
        }
        const updateUser=await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(201).json(updateUser);
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error." });
    }
}

export const deleteU = async(req,res)=>{
    try{
        const id=req.params.id;
        const userExist=await User.findById({_id:id})
        if(!userExist){
           return res.status(404).json({error: "User not found"});
        }
        const deleteU=await User.findByIdAndDelete(id)
        res.status(204).json(deleteU);
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error." });
    }

}