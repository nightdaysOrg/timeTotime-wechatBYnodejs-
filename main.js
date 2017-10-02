const mysql = require("mysql");
const express = require("express");
const https = require("https");
const qs = require("querystring");

var pool = mysql.createPool({
    host: "https://www.nightdays.net",
    user: "root",
    password: "",
    database: "",
    port: 3306,
    connectionLimit: 10
});

var app = express();
var server = https.createServer(app);
server.listen(8080);
// login
app.get("/login", (req, res) => {
    req.on("data", (data) => {
        var str = data.toString();
        var obj = qs.parse(str);
        var uname = obj.uname;
        var upwd = obj.upwd;

        var sql = "select * from timetimeuser where uname=password(?) and upwd=?";

        pool.getConnection((err, conn) => {
            if (err) {
                console.log(err + " GetConnect")
            } else {
                console.log("sueecss");
                conn.query(sql, [uname, upwd], (err, result) => {
                    if (err) {
                        console.log(err + " query")
                    } else {
                        console.log(result)
                    }
                    conn.release()
                })
            }
        })
    })
});
// signin
app.get("/signin", (req, res) => {
    req.on("data", (data) => {
        var str = data.toString();
        var obj = qs.parse(str);
        var uname = obj.uname;
        var upwd = obj.upwd;
        var sql = "insert into timetimeuser values(null,?,password(?))";

        pool.getConnection((err, conn) => {
            if (err) {
                console.log(err + " GetConnect")
            } else {
                console.log("sueecss");
                conn.query(sql, [uname, upwd], (err, result) => {
                    if (err) {
                        console.log(err + " query")
                    } else {
                        console.log(result)
                    }
                    conn.release()
                })
            }
        })
    })
});
// selectall
app.get("/selectall", (req, res) => {
    req.on("data", (data) => {
        var str = data.toString();
        var obj = qs.parse(str);
        var uid = obj.uid;
        var sql = "select * from time_to_time where uid=?";

        pool.getConnection((err, conn) => {
            if (err) {
                console.log(err + " getConnection");
            } else {
                console.log("successs");
                conn.query(sql, [uid], (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                    }
                    conn.release();
                })
            }
        })
    })
});
// selectone
app.get("/selectone", (req, res) => {
    req.on("data", (data) => {
        var str = data.toString();
        var obj = qs.parse(str);
        var tname = obj.tname;
        var uid = obj.uid;
        var sql = "select * from time_to_time where tname=? and uid=?";

        pool.getConnection((err, conn) => {
            if (err) {
                console.log(err);
            } else {
                console.log("success");
                conn.query(sql, [tname, uid], (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                    }
                    conn.release()
                })
            }
        })

    })
});
// deleteone
app.get("/deleteone", (req, res) => {
    req.on("data", (data) => {
        var str = data.toString();
        var obj = qs.parse(str);
        var tname = obj.tname;
        var uid = obj.uid;
        var sql = "delete from time_to_time where uid=? and tname=?";

        pool.getConnection((err, conn) => {
            if (err) {
                console.log(err);
            } else {
                console.log(success);
                var sql = "delete from time_to_time where uid=? and tname=?";
                conn.query(sql, [uid, tname], (err, result) => {
                    if (err) {
                        throw err;
                    }
                    if (result.affectedRows > 0) {
                        // 修改处理结果
                        console.log("delete ok")
                    } else {
                        console.log("delete not ok")
                    };
                    conn.release();
                })

            }
        })
    })
});
// insertone
app.get("/insertone", (req, res) => {
    req.on("data", (data) => {
        var str = data.toString();
        var obj = qs.parse(str);
        var tname = obj.tname;
        var tdate = obj.tdate;
        var ttime = obj.ttime;
        var uid = obj.uid;
        var sql = "insert into time_to_time values(null,?,?,?,?)";

        pool.getConection((err, conn) => {
            if (err) {
                console.log(err + " getconnection");
            } else {
                conn.query(sql, [tname, tdate, ttime, uid], (err, result) => {
                    if (err) {
                        console.log(err + " conn.query")
                    }
                    if (result.affectedRows > 0) {
                        // 修改
                        console.log("insert ok");
                    } else {
                        console.log("insert not ok");
                    }
                    conn.release();
                })
            }
        })
    })
});