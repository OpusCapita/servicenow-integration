'use strict';
const config = require('@opuscapita/config');
const Logger = require('ocbesbn-logger'); // Logger
const log = new Logger({
    context: {
        serviceName: 'servicenow-integration'
    }
});
const groupMappings = require('./utility/groupMapping');

module.exports = function (app, db, config) {
    app.post('/api/settings/assignmentgroups',
        (req, res) => {
            try {
                res.status(200).json(
                    Object.keys(groupMappings)
                        .map(it => {
                                return {
                                    name: it,
                                    translation: groupMappings[it]
                                }
                            }
                        )
                );
            } catch (e) {
                res.status(400).json({message: e.message})
            }
        }
    );
};

