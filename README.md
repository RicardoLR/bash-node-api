## Pre requisitos
- Tener Docker instalado o Node V10 dependiendo ejecución
- Tener libre el puerto 8081

## Ejecutar con Docker
- `git clone https://github.com/RicardoLR/bash-node-api`
- `docker build --no-cache -t richi/app .`
- `docker run -e PORT=8081 -p 8081:8081 -d richi/app`


## Ejecutar sin Docker teniendo NodeJS V10
- `git clone https://github.com/RicardoLR/bash-node-api`
- `npm install`
- `npm start` o usando nodemon `npm run dev`

### Pruebas empleando contenedor Docker

Con docker y si empleamos un Volumen para resguardar el documento con los nombres podemos persistir y asegurar la información.

Nota: uso de volumen a continuación
Creamos volumen usando un contenedor = `docker create -it --name data_vol_container -v /file ubuntu:14.04 bash- `
Adjuntar a nuestra imagen: - `docker run -e PORT=8081 -p 8081:8081 -d richi/app  --volumes-from data_vol_container`


### NOTA: uso de comas ',' para pruebas en BASH simulando espacios ej: "Ricardo Lopez" seria "Ricardo,Lopez"
y se agrego pequeña validación (nombres entre 20 y 50 caracteres y busqueda menos a 20) para hacer sanitizacion de datos.

## Pruebas por consola usando un sistema operativo MacOS

`bash bash/application.sh list`

`bash bash/application.sh add name=nuevo,usuario,r`

`bash bash/application.sh fuzzy-search search=buscar,por,patron`


## Pruebas por consola usando un sistema operativo Linux
Dar privilegios para correr sin docker: `sudo chmod 777 bash/application.sh && sudo chmod 777 bash/application.sh`

`./bash/application.sh list`

`./bash/application.sh add name=nuevo,usuario`

`./bash/application.sh fuzzy-search search=buscar,por,patron`


### Algoritmo de busqueda difusa

Usando JS con ES6 programación funcional para mayor rapidez se toma una cadena (cada nombre) y se recorre por cada carácter pretendiendo encontrar el mismo número de coincidencias entre el texto buscado y la cadena (nombre), de ser diferentes se descarta el elemento.

Nota: probando con 50,000 elemento el tiempo varía entre 0.015 segundo y 0.070 segundo siendo así por la arquitectura dirigida por eventos de Node, si fuera necesario optimizar más se buscaría un una arquitectura de micro-servicios con Balanceadores como Kubernetes y Nginx.

### API REST

Se usa Node como API REST para facilitar las peticiones con Bash (por el requerimiedo de usarlo por consola). ya que meramente BASH genera conflictos con caracteres, se recomienda la reutilización, "no reahacer la rueda" usando librerias como Fuse.js para algoritmos de busqueda, y escabilidad con un API REST y un Gateway.
