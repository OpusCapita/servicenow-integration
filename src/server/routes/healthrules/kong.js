module.exports.exec = function (serviceData) {
    let result = -1;
    if(serviceData.total !== serviceData.passed){
        if(serviceData.passed === 0){
            if(serviceData.deploying !== 0){
                result = 3;
            } else {
                result = 1;
            }
        } else {
            result = 3;
        }
    }
    return result;
};