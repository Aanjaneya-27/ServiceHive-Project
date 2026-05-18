import {request, response} from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const Register = async (req = request, res = response) => {
    try{
        const {name, email, password, role} = req.body;
        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({message: 'This user already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword, role});
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jwt.sign({id: user._id, role: user.role},  secret, {expiresIn:'7d'});
        res.status(201).json({message: 'User created successfully', token, user});
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({message: 'Register error', error: message});
    }
}

export const Login = async (req = request, res = response) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'});

        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid email or password'});
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jwt.sign({id: user._id, role: user.role},  secret, {expiresIn:'7d'});
        res.status(200).json({message: 'Login successful', token, user});
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({message: 'Login error', error: message});
    }
}