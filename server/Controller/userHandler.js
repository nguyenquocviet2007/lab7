const dbConnection = require("../database/mysql_connection");
const sqlQuery = require ("../database/sql_query");
const {generateAccessToken} = require("../middleware/authentication");

module.exports = {
    register: async (req, res) => {
        try {
            let {studentID, userName, password, studentName} = req.body;
            if (!studentID || !userName || !password || !studentName) {
                return res.status(400).json({
                    message: "Please provide all the required fields",
                })
            }
            let connection = await dbConnection();
            let getStudentInforQuery = `SELECT * FROM student WHERE studentID = ?`;
            let getStudentInfor = await sqlQuery(connection, getStudentInforQuery, [studentID]);
            if(getStudentInfor.length > 0) {
                return res.status(400).json({
                    message: "Student already exists",
                })
            }
            else{
                let insertStudentQuery = `INSERT INTO student (studentID, userName, password, studentName) VALUES (?, ?, ?, ?)`;
                let insertStudent = await sqlQuery(connection, insertStudentQuery, [studentID, userName, password, studentName]);
                return res.status(200).json({
                    message: "Student registered successfully",
                })
            }
        }
        catch (error){
            console.log(error);
            return res.status(500).json({
                message: "Internal server error",
            })
        }
    },
    login: async (req, res) => {
        try{
            let {userName, password} = req.body;
            if (!userName || !password) {
                return res.status(400).json({
                    message: "Please provide all the required fields",
                })
            }
            let connection = await dbConnection();
            let getStudentLoginQuery = `SELECT * FROM student WHERE userName = ?`;
            let getStudentLogin = await sqlQuery(connection, getStudentLoginQuery, [userName]);
            if (getStudentLogin.length === 0) {
                return res.status(400).json({
                    message: "userName or Password is not correct"
                })
            }
            else if (password !== getStudentLogin[0].password) {
                return res.status(400).json({
                    message: "userName or Password is not correct"
                })
            }
            else {
                let token = generateAccessToken(getStudentLogin[0].studentID);
                return res.status(200).json({
                    message: "Login successfully!!!",
                    token: token
                })
            }
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                message: "Internal server error",   
            })
        }
    }
}