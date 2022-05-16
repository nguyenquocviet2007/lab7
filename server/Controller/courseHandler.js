const dbConnection = require("../database/mysql_connection");
const sqlQuery = require ("../database/sql_query");

module.exports = {
    getAllCourse: async (req, res) => {
        try{
            let connection = await dbConnection();
            let getAllCourseQuery = `SELECT CourseName FROM course`;
            let getAllCourse = await sqlQuery(connection, getAllCourseQuery);
            return res.status(200).json({
                CourseData: getAllCourse,
            })
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                message: "Internal server error",
            })
        }
    },
    registerCourse: async (req, res) => {
        try{
            let {courseName} = req.body;
            let studentID = req.user.id;
            for (let i = 0; i < courseName.length; i++){
                let getCourseIDQuery = `SELECT CourseID FROM course WHERE CourseName = ?`;
                let getCourseID = await sqlQuery(connection, getCourseIDQuery, [courseName[i]]);
                let insertCourseQuery = `INSERT INTO studentcourse (studentID, courseID) VALUES (?, ?)`;
                let insertCourse = await sqlQuery(connection, insertCourseQuery, [studentID, getCourseID[0].CourseID]);
            }
            return res.status(200).json({
                message: "Course registered successfully",
            })
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                message: "Internal server error",
            })
        }
    }, 
    getCourseOfStudent: async (req, res) => {
        try{
            let studentID = req.user.id;
            let getCourseOfStudentQuery = `SELECT StudentName CourseName 
                                           FROM studentcourse sc, student s, course c
                                           WHERE sc.studentID = s.studentID
                                           AND sc.courseID = c.courseID
                                           AND s.studentID = ?`;
            let getCourseOfStudent = await sqlQuery(connection, getCourseOfStudentQuery, [studentID]);
            return res.status(200).json({
                CourseData: getCourseOfStudent,
            })
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                message: "Internal server error",
            })
        }
    },
    updateCourseOfStudent: async (req, res) => {
        try{

        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                message: "Internal server error",
            })
        }
    }
}