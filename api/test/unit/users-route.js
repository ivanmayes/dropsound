
'use strict';

var request     = require( 'supertest' ),
    express     = require( 'express' ),
    cors        = require( 'cors' ),
    bodyParser  = require( 'body-parser' ),
    Promises    = require( 'bluebird' ),
    mongoose    = Promises.promisifyAll( require( 'mongoose' ) ),
    config      = require( '../../config' ),
    auth        = require( '../../lib/auth' ),
    route       = require( '../../lib/routes/users' ),
    app         = express(),
    router      = express.Router(),
    password    = '1234567890',
    user        = {
        'username':  'foo',
        'firstName': 'Foobar',
        'lastName':  'Barbaz',
        'email':     'foo@bar.baz'
    },
    authStub;

suite( 'User Routes', function () {

    suiteSetup( function ( done ){

        authStub = sinon.stub( auth , 'requireUser' , function ( req , res , next ) {
            req.user = user;
            return next();
        });

        mongoose.connect( 'mongodb://localhost/nlmg_test' , config.db.options );

        app.use(bodyParser.urlencoded({ extended: true }));

        // parse application/json
        app.use(bodyParser.json());

        // parse plain text
        app.use(bodyParser.text());

        // parse various different custom JSON types as JSON
        app.use(bodyParser.json({ type: 'application/*+json' }));

        app.use( '/' , router );

        route( router );

        done();
    });

    // setup( function ( done ){done();});

    // teardown( function ( done ){done();});

    suiteTeardown( function ( done ){
        auth.requireUser.restore();

        return mongoose
            .connection
            .db
            .executeDbCommand({
                dropDatabase: 1
            },
            function( err , result ) {
                return mongoose.connection.close( done );
            });
    });

    test( 'GET /me', function ( done ) {
        request( app )
            .get( '/me' )
            .expect( function( res ) {
                assert.equal( res.status , 200 , 'response has a status code of 200.');
                assert.isObject( res.body , 'response body is object' );
                assert.isObject( res.body.meta , 'response body.meta is object' );
                assert.equal( res.body.meta.code , 200 , 'response meta code is 200.');
                assert.isObject( res.body.response , 'response body.response is object' );
            })
            .end( function( err , res ){
                if ( err ) {
                    return done( err );
                }
                done();
            });
    });

    test( 'POST /signup', function ( done ) {

        request( app )
            .post( '/signup' )
            .send({
                'userName':  user.username,
                'firstName': user.firstName,
                'lastName':  user.lastName,
                'email':     user.email,
                'password':  password
            })
            .expect( function( res ) {
                assert.equal( res.status , 200 , 'response has a status code of 200.');
                assert.isObject( res.body , 'response body is object' );
                assert.isObject( res.body.meta , 'response body.meta is object' );
                assert.equal( res.body.meta.code , 200 , 'response meta code is 200.');
                assert.isObject( res.body.response , 'response body.response is object' );
            })
            .end( function( err , res ){
                if ( err ) {
                    return done( err );
                }
                done();
            });
    });

    test( 'POST /login', function ( done ) {

        request( app )
            .post( '/login' )
            .send({
                'email':     user.email,
                'password':  password
            })
            .expect( function( res ) {
                assert.equal( res.status , 200 , 'response has a status code of 200.');
                assert.isObject( res.body , 'response body is object' );
                assert.isObject( res.body.meta , 'response body.meta is object' );
                assert.equal( res.body.meta.code , 200 , 'response meta code is 200.');
                assert.isObject( res.body.response , 'response body.response is object' );
            })
            .end( function( err , res ){
                if ( err ) {
                    return done( err );
                }
                done();
            });
    });

});
