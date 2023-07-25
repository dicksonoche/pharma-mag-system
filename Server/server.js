import express from "express";
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from "cookie-parser";
import bcrypt from 'bcrypt' //for password hashing
import Jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup",
})

const mystorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    }, //three parameters(request, file and a callback function)
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: mystorage
})

con.connect(function (err) {
    if (err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})

//to create the login API

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users Where email = ? AND password = ?"; //This is the query
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" });
        if (result.length > 0) {
            return res.json({ Status: "Success" })
        } else {
            return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
    }) //con to create a connection
})

app.post('/create', upload.single('myimage'), (req, res) => {
    const sql = "INSERT INTO tasks (`name`,`email`,`password`,`cost`,`description`,`image`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) return res.json({ Error: "Error in hashing password" });
        const data = [
            req.body.name,
            req.body.email,
            hash,
            req.body.cost,
            req.body.description,
            req.file.filename
        ]
        con.query(sql, [data], (er, result) => {
            if(err) return res.json({ Error: "Inside signup query" })
            return res.json({ Status: "Success" });
        })
    }) //callback funtion (err)
}) //npm install multer path. multer is used for uploading files

app.listen(9876, () => {
    console.log("Running");
})