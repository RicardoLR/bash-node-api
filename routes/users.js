const {parseHrtimeToSeconds, fuzzyMatch} = require('../utils/utils')

const fs = require('fs')
const readline = require('readline');
const { check, validationResult } = require('express-validator/check');

module.exports = (router) => {


    /**
     * 
     * @param request 
     * @param response 
     * @return Json with all list names
     */
    const getAll  = (req, res) => {

        let nombres = [];

        const rl = readline.createInterface({
        input: fs.createReadStream('./file/users.txt'),
            crlfDelay: Infinity
        });
        
        rl.on('line', (line) => {
            nombres.push({name:line});
        });
    
    
        rl.on('close', function() {
            res.json({data: nombres.sort()})
        });
    }

    /**
     * 
     * @param request 
     * @param response 
     * @return Json with name inserted.
     */
    const postUser  = (req, res) => {

        if (!validationResult(req).isEmpty()) 
            return res.status(422).json({ error: "Nombres permitidos con rango de 10 y 50."  });

        let name = req.body.name.replace(/,/g, ' ');

        var logStream = fs.createWriteStream('./file/users.txt', {'flags': 'a'});
        logStream.write('\n'+name);
        logStream.end( res.json({message:'Usuario agregado'}) );

    }

    /**
     * 
     * @param request 
     * @param response 
     * @return Json with the approximate names.
     */
    const searchUser  = (req, res) => {

        if (!validationResult(req).isEmpty()) 
            return res.status(422).json({ error: "Busquedas permitidas menores a 20 caracteres."  });

        let nombres = [];
        let search = req.body.search.replace(/,/g, ' ');

        let startTime = process.hrtime();
    
        const rl = readline.createInterface({
        input: fs.createReadStream('./file/users.txt'),
            crlfDelay: Infinity
        });
        
        rl.on('line', (line) => {
            if( fuzzyMatch(line,search) ) 
                nombres.push(line);
        });
    
        rl.on('close', function() {   
            if(nombres.length==0)
                res.json({message:"Sin coincidencias"});
            else            
                res.json({name: nombres});

        
            let elapsedSeconds = parseHrtimeToSeconds(process.hrtime(startTime));
            console.log('Tiempo tomado ' + elapsedSeconds + 'segundo');
        });
    }


	//Link routes and functions
	router.get("/file", getAll)
	router.post("/file", [
        check('name').isLength({ min: 10 }),
        check('name').isLength({ max: 50 })

    ], postUser)
	router.post("/file/search", [
        check('name').isLength({ max: 20 })

    ],searchUser)

}
