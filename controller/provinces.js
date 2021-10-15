const models = require('../model/index');

exports.index = async (req, res, next) => {
    try {
        provinces = await models.sequelize.query(`
        SELECT prov.id,
        prov.pro_no, 
        prov.province_name, 
        
        dis.Dis_ID,
        dis.Dis_No,
        dis.Dis_Name,
        
        vil.Vil_ID,
        vil.Vil_No,
        vil.Vil_Name
        
        FROM provinces as prov
        
        JOIN districts as dis
        ON prov.id = dis.Dis_ID
        
        JOIN villages as vil
        ON prov.id = vil.Vil_ID;`, {
            logging:false,
            type: models.sequelize.QueryTypes.SELECT
        });
        return res.status(200).json(provinces)
    } catch (e) {
        return res.status(e.statusCode).json({
            error: {
                message: e.message
            }
        });
    }
}