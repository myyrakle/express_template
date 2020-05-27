const {Sequelize} = require('sequelize');

//postgres인 경우
//require('pg').defaults.parseInt8 = true;

async function setSequelize(request, response, next){
    try{
        request.sequelize = new Sequelize(
            "DB명",
            "사용자명", 
            "패스워드", 
            {
                host: "호스트",
                dialect: "postgres", //DB 종류
                define: {},
                dialectOptions: {
                    options: { requestTimeout: 10000 }
                },
                pool: {
                    max: 60,
                    min: 0,
                    idle: 10000
                },
            }
        );
    } catch(error) {
        console.log(`${String(error)}`);
    }
    next();
}

module.exports = setSequelize;