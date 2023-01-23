exports.getDateTime = () => {
    let dateObj = new Date;
    let date = dateObj.toISOString().split('T');

    return date[0] + ' ' + date[1];
}

exports.getDate = () => {
    let dateObj = new Date;
    return dateObj.toISOString().split('T')[0];
}