import express, { response } from "express";
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from "cookie-parser";
import bcrypt from 'bcrypt' //for password hashing
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

const app = express();
app.use(cors(
    {
        origin: ["http://localhost:5173"], //from where we would like to access
        methods: ["POST", "GET", "PUT"],
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'))//to access the images. Means that the public folder can be accessed

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

//To create the login API

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users Where email = ? AND password = ?"; //This is the query
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" });
        if (result.length > 0) {
            const id = result[0].id
            const token = jwt.sign({ role: "admin" }, "jwt-secret-key", { expiresIn: '1d' }); //To generate the token from the id
            res.cookie('token', token); //The parameters here are token as key, and token as value //This is the cookie
            return res.json({ Status: "Success" })
        } else {
            return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
    }) //con to create a connection
})

//To create visitor login API

app.post('/visitorlogin', (req, res) => {
    const sql = "SELECT * FROM tasks Where email = ?"; //This is the query
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password error" });
                /*const id = result[0].id*/ //role: "visitor", so that a random visitor does not have access to the admin dashboard
                const token = jwt.sign({ role: "visitor", id: result[0].id }, "jwt-secret-key", { expiresIn: '1d' }); //To generate the token from the id
                res.cookie('token', token); //The parameters here are token as key, and token as value //This is the cookie
                return res.json({ Status: "Success", id: result[0].id })
            })
        } else {
            return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
    }) //con to create a connection
})

//To logout

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
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
        con.query(sql, [data], (err, result) => {
            if (err) return res.json({ Error: "Inside signup query" })//res.data.Error(in Frontend)
            return res.json({ Status: "Success", Result: result });//res.data.Status(in Frontend)
        })
    }) //callback funtion (err)
}) //npm install multer path. multer is used for uploading files


//To authenticate the dashboard
const verifyUser = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({ Error: "You are not Authorized" })
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) return res.json({ Error: "Token wrong" })
            req.role = decoded.role //To verify the type of user we are authenticating into dashboard
            req.id = decoded.id //To verify the id of the user
            next();
        })
    }
}

app.get('/dashboard', verifyUser, (req, res) => {
    return res.json({ Status: "Success", role: req.role, id: req.id })
})

app.get('/adminCount', (req, res) => {
    const sql = "SELECT count(id) as admin from users"
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" })
        return res.json(result);
    })
})

app.get('/taskCount', (req, res) => {
    const sql = "SELECT count(id) as tasks from tasks"
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" })
        return res.json(result);
    })
})

app.get('/costCount', (req, res) => {
    const sql = "SELECT sum(cost) as sumOfCost from tasks"
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" })
        return res.json(result);
    })
})

//To get the tasks for display 
app.get('/getTasks', (req, res) => {
    const sql = "SELECT * FROM tasks"//This is the query
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Get task error in sql" })//res.data.Error(in Frontend)
        return res.json({ Status: "Success", Result: result })//res.data.Status(in Frontend)
    })//The two params "err" and "result". If there's error, display error message. If no error, return the result.
})

//To get the id for updates
app.get('/get/:id', (req, res) => {
    const id = req.params.id
    const sql = "SELECT * FROM tasks where id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Get task error in sql" })//res.data.Error(in Frontend)
        return res.json({ Status: "Success", Result: result })//res.data.Status(in Frontend)
    })//The two params "err" and "result". If there's error, display error message. If no error, return the result.
})

//To create the update api for posting
app.put('/update/:id', (req, res) => {
    console.log(req.body);
    const id = req.params.id
    const sql = "UPDATE tasks set name = ?, email = ?, cost = ?, description = ? WHERE id = ?";
    con.query(sql, [req.body.name, req.body.email, req.body.cost, req.body.description, id], (err, result) => {
        if (err) return res.json({ Error: "Update task error in sql" })
        return res.json({ Status: "Success" })
    })
})

//To delete a task
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    const sql = "DELETE FROM tasks WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return req.json({ Error: "Delete task error in sql" })
        return res.json({ Status: "Success" })
    })
})

app.listen(9876, () => {
    console.log("Running");
})