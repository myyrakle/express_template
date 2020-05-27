const {Sequelize} = require('sequelize');

try{
    //postgres인 경우
    //require('pg').defaults.parseInt8 = true;

    const sequelize = new Sequelize(
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

    module.exports = sequelize;
} catch(error) {
    console.log(`${String(error)}`);
    module.exports = null;
}

