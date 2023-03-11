const bcrypt = require('bcryptjs');
const con = require('../../config/database.js')
const session = require('express-session');
const express = require('express')
const jwt = require('jsonwebtoken')
require("dotenv").config();
const userModule = require('../../modules/user.js')

// const { create } = require('../service/user.service.js')


const User = () => {
    return {

        createUser: async (req, res) => {
            const salt = bcrypt.genSaltSync(10);
            const password = bcrypt.hashSync(req.body.password, salt);
            const value = [req.body.username, req.body.email, password]
            userModule.registerUser(value, (error, data) => {
                if (error) {
                    res.status(500).json({ error });
                }
                else {
                    res.status(200).json({ message: 'User registered successfully!' });
                }
            });

        },


        loginUser: (req, res) => {
            email = req.body.email;
            password = req.body.password;
            if (email && password) {
                con.query(`SELECT * FROM user WHERE email = ?`, [email], (error, results) => {
                    if (error) {
                        res.send({ success: false, message: 'An error occurred' });
                    } else if (results.length > 0) {
                        const user_id = results[0].id
                        const user_name = results[0].username
                        bcrypt.compare(password, results[0].password, (error, result) => {
                            if (result) {
                                const token = jwt.sign({ user_id, user_name }, process.env.JWT_KEY)
                                con.query(`UPDATE user SET token = ? WHERE email = ?`, [token, email], (error, resultData) => {
                                    if (error) {
                                        res.status(500).send({ success: false, message: 'An error occurred' });
                                    } else {
                                        res.send({
                                            success: true, token: token, data: {
                                                user_id
                                            }, message: 'Login successful'
                                        });
                                    }
                                })

                            } else {
                                res.send({ success: false, message: 'Incorrect email or password' });
                            }
                        });
                    } else {
                        res.send({ success: false, message: 'Incorrect email or password' });
                    }
                });
            } else {
                res.send({ success: false, message: 'Please enter email and password' });
            }

        },

        updateUser: async (req, res) => {
            const id = req.params.id;
            const { username, email } = req.body;
            try {
                const user = await userModule.updateUser(username, email, id);
                res.status(200).json({ message: 'User updated successfully!', user });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'An error occurred while updating user.', error });
            }

        },

        deleteUser: (req, res) => {
            const id = req.params.id;
            userModule.deleteUser(id, (error, result) => {
                if (error) {
                    console.log(error)
                    return res.status(500).send('Error deleting User');
                }
                res.send('User deleted')
            })
        }
    }

}

module.exports = User