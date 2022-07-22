const transferHourToMinutes=(string)=>{
    var c=string.split(':');
    return parseInt(c[0])*60+parseInt(c[1]);
}

module.exports={transferHourToMinutes};