const Group = require('../models/Group');

function groupsIndex(req, res, next) {
  Group
    .find()
    .then(groups => res.status(200).json(groups))
    .catch(next);
}

module.exports = {
  index: groupsIndex
};
