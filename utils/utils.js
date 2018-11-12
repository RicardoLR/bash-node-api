/**
 * œparams hrtime
 * œreturn hrtime in seconds
 */
module.exports.parseHrtimeToSeconds = (hrtime) => {
    let seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
    return seconds;
}


/**
 * œparams text
 * œparams search
 * œreturn Boolean of String found 
 */
module.exports.fuzzyMatch = (text, search) => {
    
    var search = search.replace(/\ /g, '').toLowerCase();
    var search_position = 0;

    for (let item of text) {
        if(search_position < search.length && item.toLowerCase() == search[search_position])
            search_position += 1;
    }
    
    if (search_position != search.length){
        return false;
    }

    return true;
}

