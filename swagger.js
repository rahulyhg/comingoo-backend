var swaggerJSDoc = require('swagger-jsdoc');

let swagger = function(app){
    // swagger definition
    var swaggerDefinition = {
        info: {
        title: 'Comingoo REST API List',
        version: '1.0.0',
        description: 'Here is the total list of APIs for COMINGOO app development',
        },
        host: 'localhost:3030',
        basePath: '/',
    };

    // options for the swagger docs
    var options = {
        // import swaggerDefinitions
        swaggerDefinition: swaggerDefinition,
        // path to the API docs
        apis: ['./**/routes/*.js','routes.js'],// pass all in array 
    };

        // initialize swagger-jsdoc
    var swaggerSpec = swaggerJSDoc(options);
    app.get('/swagger.json', function(req, res) {  
        res.setHeader('Content-Type', 'application/json');   
        res.send(swaggerSpec); 
    });
}

module.exports = swagger ;