'use strict'
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

const server = require('http').createServer(app)
const HOST = '0.0.0.0';
const routerApi = express.Router()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Podemos asignar solo la IP dueña para acceso limitado
 */
app.use(cors())

app.use("/api", routerApi)


/**
 * Manera de escalar y modular multiples rutas
 */
fs.readdirSync(path.join(__dirname, '.', "routes/")).forEach(function(file) {
	require("./routes/" + file)(routerApi)
})


const port = process.env.PORT || '8081'

server.listen(port, HOST,  function() {
	console.log("INFO","Node server running on " + HOST +":"+ port)
})
