module.exports.exec = function (serviceData) {
    let result = {sev: 0, reason: 'none'};
    if (serviceData.total !== serviceData.passed || serviceData.total === 0)  {
        if (serviceData.passed === 0) {
            result.sev = 2;
            result.reason = 'service down'
        } else if ((serviceData.passed + serviceData.deploying) === serviceData.total) {
            result.sev = 0;
        } else {
            result.sev = 2;
            result.reason = 'instance down'
        }
    }
    return result;
};