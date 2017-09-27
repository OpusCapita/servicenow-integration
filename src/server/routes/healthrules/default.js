module.exports.exec = function (serviceData) {
    let result = -1;
    if(serviceData.total !== serviceData.passed){
        if(serviceData.passed === 0){
            result = 2;
        } else {
            result = 3;
        }
    }
    return result;
};