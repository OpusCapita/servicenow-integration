module.exports.exec = function (serviceData) {
    let result = -1;
    if (serviceData.total !== serviceData.passed) {
        if (serviceData.passed === 0) {
            result = 2;
        } else if ((serviceData.passed + serviceData.deploying) === serviceData.total) {
            result = 0;
        } else {
            result = 3;
        }
    }
    return result;
};