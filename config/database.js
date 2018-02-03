const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;
const mysecret = proccess.env.MYSECRET;

module.exports = {
    database: 'mongodb://'+dbuser+':'+dbpassword+'@ds257627.mlab.com:57627/altcoin-charter',
    secret:mysecret
}