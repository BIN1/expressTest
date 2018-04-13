const {connection,sql}=require('../config/index.js');

const getBanner=(req,res) => {
    (async() => {
        const {status,type,is_del}=req.query;
        let sqlFactory = `SELECT * FROM banner_img WHERE status=${status} and type=${type} and is_del=${is_del}`;
        console.log(req.params);
        await connection.query(sqlFactory,function(err,rows,fields){
            if(rows){
                res.status(200).json({
                    statusCode:200,
                    message:'success',
                    result:rows
                })
            }else{

            }
        })
    })()
};

const addAddress=(req,res) => {
    (async() => {
        const {id}=req.body;
        let sqlFactory=`SELECT * from region where parent_id=${id}`;
        await connection.query(sqlFactory,function(err,rows,fields){
            if(rows){
                res.status(200).json({
                    statusCode:200,
                    message:'success',
                    result:rows
                })
            }else{

            }
        })
    })();
}
const indexData=(req,res) => {
    (async() => {
        const { type } = req.body;
        let sqlBannerFactory = `SELECT * from banner_img where status=1 and type=${type} and is_del=0`;
        let sqlPrcType = `SELECT * from banner_img where status=1 and type=1 and is_del=0`;
        await connection.query(sqlPrcType,function(err,rows,fields){
            if(rows){
                console.log('productType');
                res.status(200).json({
                    statusCode:200,
                    message:"success",
                    result:{productType:rows}
                })
            }else{
                console.log(err)
            }
        })
    })()
};

const userData=(req,res) => {
    (async() => {
        const { mobile,password } = req.body;
        let userSql = `SELECT * FROM express_user where mobile=${mobile}`;
        await connection.query(userSql,function(err,rows,fields) {
            if(rows){
                if(rows[0].password!=password){
                    res.status(200).json({
                        statusCode:400,
                        message:'账号或密码错误',
                        result:null
                    })
                }else{
                    res.status(200).json({
                        statusCode:200,
                        message:'success',
                        result:rows
                    })
                }
            }else{
                console.log(err)
            };
        })
    })()
};

const userRegister=(req,res) => {
    (async() => {
        const {mobile,password,user_name}=req.body;
        let insetTo = `INSERT INTO express_user (mobile,password,user_name) value (${mobile},${password},"${user_name}")`;
        await connection.query(insetTo,function(err,rows,fields){
            if(rows){
                res.status(200).json({
                    statusCode:200,
                    message:'success',
                    result:rows
                })
            }else{
                console.log(err)
            }
        })
    })()
};

const editPassword=(req,res) => {
    (async() => {
        const {mobile,oldpassword,password,id}=req.body;
        let oldSql = `SELECT * FROM express_user where mobile=${mobile} and password=${oldpassword}`;
        await connection.query(oldSql,function(err,rows,fields) {
            if(rows){
                if(rows[0].password!=oldpassword){
                    console.log('a')
                    res.status(200).json({
                        statusCode:400,
                        message:'账号或密码错误',
                        result:null
                    })
                }else{
                    connection.query(`update express_user set password='${password}' where id=${id}`,function(err,newRows,fields){
                        console.log(`update express_user set password=${password} where id=${id}`);
                        res.status(200).json({
                            statusCode:200,
                            message:'success',
                            result:newRows
                        });
                    });
                }
            }else{
                console.log(err)
            };
        })
    })()
}
module.exports = {
  getBanner,
  addAddress,
  indexData,
  userData,
  userRegister,
  editPassword
};