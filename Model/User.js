const {Model, DataTypes} = require('sequelize');

class User extends Model
{}

User.init(
    {username = DataTypes.STRING},
    {password = DataTypes.STRING},

    {email = DataTypes.STRING},
    {phone = DataTypes.STRING},

    {gender = DataTypes.CHAR},
    
    {usertype = DataTypes.CHAR}, //'A(admin'
    
    {usable = DataTypes.BOOLEAN},

    {signup_date = DataTypes.DATE}, //가입일시
    {update_date = DataTypes.DATE}, //수정일시
    {withdraw_date = DataTypes.DATE}, //탈퇴일시
    
    {sequelize:require('./connect'), modelName:'User'}
);

module.exports = User;