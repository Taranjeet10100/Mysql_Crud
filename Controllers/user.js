const path = require('path');

const User = require("../Models/user.model");
const bcrypt = require("bcryptjs");
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');


exports.getUserSignup = async (req, res) => {
    const error = false,
        messages = false;
    res.render('trainee-signup', {
        error, messages,
    });
};


exports.postUserSignup = async (req, res) => {
    try {
        console.log("post");
        const { name, email, password, Cpassword, gender, phone_no, } = req.body;
        console.log("name : ",name);
        console.log("email : ",email);
        console.log("password : ",password);
        console.log("Cpassword : ",Cpassword);

        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) throw { type: "email", error: "Invalid Email" };
        if (!/^[A-Za-z]+/.test(name)) throw { type: "name", error: "invalid name" };
        console.log("gender : ",gender);
        if (!password) throw { type: "password", error: "password cannot be empty" };
        console.log("user");

        // if (! /[2-9]{2}\d{8}/.test(phone_no)) throw { type: "phoneNo", error: "contact number is not valid" };
        console.log("phoneno : ",phone_no);

        if (password != Cpassword) {
            console.log("password not same");
            return res.status(400).json({
                status: "passwords are not same"
            });
        }
        console.log("phone_no : ",phone_no);

        const user = await User.findOne({ where: { email: email } });
        if (user) {
            throw new Error("user already exists");
        }
        console.log("user");
        const phone = await User.findOne({ where: { phone_no: phone_no } });
        if (phone) {
            throw new Error("phone number already exist");
        }
        const hashPassword = await bcrypt.hash(password, 12);
       console.log("user2");
        const user1 = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            phone_no: phone_no,
            gender: gender,
        });

        console.log("user :",user1);
        const error = false,
            messages = true;
        res.render('trainee-signup', {
            error, messages,
        });
    } catch (error) {
        error = error;
        res.render('trainee-signup', {
            error,
        });
    }
};


exports.getUpdateUser = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const user = await User.findOne({ where: { id: user_id } });

        res.status(200).json({
            response_code: 200,
            status: "user to be updated",
            result: {
                user
            }
        });

    } catch (error) {
        console.log(error);
    }
};


exports.postUpdateUser = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const {
            name,
            email,
            password,
            phone_no,
            gender
        } = req.body;
        const user = await User.findOne({ where: { id: user_id } });

        const updatedUser = await User.update(
            {
                name,
                email,
                password,
                phone_no,
                gender
            },
            { where: { id: trainee_id } }
        );
        res.status(200).json({
            response_code: 200,
            status: "trainee updated successfully",
            result: updatedUser
        });
    } catch (error) {
        res.status(400).json({
            response_code: 400,
            error: error.message
        });
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const user = await User.findOne({ where: { id: user_id } });
        res.status(200).json({
            response_code: 200,
            status: "trainee",
            result: {
                user
            }
        });
    } catch (error) {
        console.log(error);
    }
};


exports.postDeleteUser = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const user = await User.findOne({ where: { id: user_id } });
        const deletedUser = await Trainee.destroy({ where: { id: user.id } });
        res.status(200).json({
            response_code: 200,
            status: "trainee deleted successfully",
            result: {
                user
            }
        });
    } catch (error) {
        res.status(200).json({
            response_code: 200,
            status: "error occured while deleting",
            error: error.message
        });
    }
};

