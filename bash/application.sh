#!/bin/bash
HR=\''Content-Type: application/x-www-form-urlencoded'\'

PARAM1=$1
BODY=$2

#
# Variables de entorno para ambiente productivo o en al nube
# Ejemplo: export URL=www.mi-dominio.com
#
if [ -n "$URL" ]; then URL=$URL ; else URL='http://localhost'; fi
if [ -n "$PORT" ]; then PUERTO=$PORT ; else PUERTO=8081; fi

case $PARAM1 in
     'add')

        curl -X POST "$URL:$PUERTO/api/file" -H $HR --data $BODY

        # PETITION_POST="curl -X POST http://localhost:$PUERTO/api/file -H $HR --data $BODY"
        # echo $PETITION_POST      
        # RESPONSE=`$PETITION_POST`
        # echo $RESPONSE      

    ;;
     "list")

        curl "$URL:$PUERTO/api/file"

        # PETITION_GET="curl http://localhost:$PUERTO/api/file"
        # echo $PETITION_GET      
        # RESPONSE=`$PETITION_GET`
        # echo $PETITION_GET
    ;;
    "fuzzy-search")
        
        curl -X POST "$URL:$PUERTO/api/file/search" -H $HR --data $BODY
        
        # PETITION_POST="curl -X POST http://localhost:$PUERTO/api/file/search -H $HR --data $BODY"
        # echo $PETITION_POST      
        # RESPONSE=`$PETITION_POST`
        # echo $RESPONSE     
    ;;
     *)
        echo "Verifique su peticion"
    ;;
esac
