import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//user Rigistration all case define backend Authentication
class UserController{
    static userRegistration = async (req,res) =>{
        const {name,email,password,password_confirmation,tc} = req.body 
        const user = await UserModel.findOne({email:email})
        if(user){
            res.send({"status":"failed","message":"Email already exists"})
        }else{
            if(name && email && password && password_confirmation && tc){ 
                if(password === password_confirmation){
                   try{
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password,salt)
                    const doc = new UserModel({
                        name:name,
                        email:email,
                        password:hashPassword,
                        tc:tc
                    })
                    await doc.save()
                    const saved_user = await UserModel.findOne({email:email})
                    //Generate JWT Token
                    const token = jwt.sign({userID:saved_user._id},
                    process.env.JWT_SECRET_KEY ,{ expiresIn:'5d'})
                    //end JWT
                    res.status(201).send({"status":"Success","message":"Registeration Success Full","token":token})
                   } catch (error){
                    res.send({"status":"failed","message":"unable to Register"})
                   }
                } else{
                    res.send({"status":"failed","message":"Password and Confirm Password doesn't match"})
                }  
            }else{
                res.send({"status":"failed","message":"All fields are required"})
            }
        }
    }

    //user userLogin all case define backend Authentication
    static userLogin = async (req,res) => {
        try{
            const {email,password} = req.body
            if(email && password){
                const user = await UserModel.findOne({email:email})
                if(user != null){
                    const isMatch = await bcrypt.compare(password,user.password)
                    if((user.email === email) && isMatch){
                        //Generate JWT Token
                        const token = jwt.sign({userID:user._id},
                        process.env.JWT_SECRET_KEY ,{ expiresIn:'5d'})
                        //end JWT
                        res.send({"status":"success","message":"Login Success","token":token})
                    }else{
                        res.send({"status":"failed","message":"Email or Password is not Valid"})
                    }
                }else{
                    res.send({"status":"failed","message":"You are not a Required user"})
                }
            }else{
                res.send({"status":"failed","message":"All fields are required"})
            }

        } catch (error){
            console.log(error);
            res.send({"status":"failed","message":"Unable to Login"})
        }
    }
    //Change password in user (user janata hai but kudin ke bad change karana chahata hai password)
    static changeUserPassword = async(req,res) =>{
        const {password,password_confirmation} = req.body
        if(password && password_confirmation){
            if(password !== password_confirmation){
                res.send({"status":"failed","message":"New Password and Confirm New Password doesn't match"})
            }else{
                const salt = await bcrypt.genSalt(10)
                const newHashPassword = await bcrypt.hash(password,salt)
                //console.log(req.user._id)
                await UserModel.findByIdAndUpdate(req.user._id, {$set: {
                    password:newHashPassword }})
                res.send({"status":"success","message":"Password changed successfully"})
            }
        }else{
            res.send({"status":"failed","message":"All Fields are Required"})
        }
    }
    //Logged in User ka data mil jaye or user profile dikhana ho to kam aata hai
    static loggedUser = async(req,res) => {
        res.send({"user": req.user })
    }

    //Reset password and Email
    static sendUserPasswordResetEmail = async (req, res) =>{
        const { email } = req.body
        if(email) {
            const user = await UserModel.findOne({ email: email})
            if(user) {
                const secret = user._id + process.env.JWT_SECRET_KEY
                const token = jwt.sign({ userID: user._id }, secret, {
                    expiresIn: '15m' })
                    //frient end link
                    const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
                    console.log(link)
                    res.send({"status":"success","message":"Password Reset Email Sent... Please Check Your Email "})
            }else{
                res.send({"status":"failed","message":"Email doesn't exists"})
            }

        } else {
            res.send({"status":"failed","message":"Email Field is Required"}) 
        }
    }
    //user password reset 
    static userPasswordReset = async(req,res) =>{
        const {password, password_confirmation} = req.body
        const {id, token} = req.params
        const user = await UserModel.findById(id)
        const new_secret = user._id + process.env.JWT_SECRET_KEY
        try {
            jwt.verify(token, new_secret)
            if(password && password_confirmation){
                if(password !== password_confirmation){
                    res.send({"status":"failed","message":"New Password and Confirm New Password doesn't match"}) 
                }else{
                    const salt = await bcrypt.genSalt(10)
                    const newHashPassword = await bcrypt.hash(password,salt)
                    await UserModel.findByIdAndUpdate(user._id, {$set: {
                        password:newHashPassword }})
                        res.send({"status":"success","message":"Password Reset Successfully" })   
                }
            }else{
                res.send({"status":"failed","message":"All Field are Required"})   
            }
        } catch (error) {
            console.log(error)
            res.send({"status": "failed","message":"Invalid Token"})
        }
    } 
}

export default UserController