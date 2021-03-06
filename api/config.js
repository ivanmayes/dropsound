
var path = require( 'path' );

module.exports = exports = {
    db: {
        uri: process.env.MONGODB ||
             process.env.MONGORILLA_MONGO_URL ||
             process.env.MONGOLAB_URI ||
             process.env.MONGOHQ_URL ||
             'mongodb://localhost/dropsound',
        options: {
            db: {
                safe: true
            },
            socketOptions: {
                keepAlive: 1
            }
        }
    },
    logPath: process.env.LOG_PATH || path.resolve( __dirname + '/logs/api.log'),
    port: process.env.PORT || 3000,
    versionPrefix: process.env.versionPrefix || '/v1'
};
