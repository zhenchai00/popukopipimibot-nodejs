exports.getDateTime = () => {
    let dateObj = new Date;
    let date = dateObj.toISOString().split('T');

    return date[0] + ' ' + date[1];
}

exports.getDate = () => {
    let dateObj = new Date;
    return dateObj.toISOString().split('T')[0];
}

exports.getCapitalizeFirstLetter = (string) => {
    let arr = string.split(' ');
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(' ');
}