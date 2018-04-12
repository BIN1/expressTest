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
module.exports = {
  getBanner,
  addAddress
};