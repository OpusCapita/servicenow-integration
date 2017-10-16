const nunjucks = require('nunjucks');
/**
 *  Simple function to group listitems by the result of the keyGetter-method
 * @param list
 * @param keyGetter
 * @returns {Map}
 */
module.exports.groupBy = function (list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
};

module.exports.renderTemplate = function (template, data) {
    nunjucks.configure({autoescape: false});
    return nunjucks.render(template, data);
};

module.exports.getFormattedDateString = function (date = new Date()) {
    return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
};