const Group = require('../models/Group');

function groupsIndex(req, res, next) {
  Group
    .find()
    .then(groups => res.status(200).json(groups))
    .catch(next);
}

function groupsShow(req, res, next) {
  Group
    .findById(req.params.id)
    .populate('messages')
    .populate('createdBy messages users owner')
    .populate({
      path: 'messages',
      populate: {
        path: 'user',
        model: 'User'
      }
    })
    .then(group => res.status(200).json(group))
    .catch(next);
}

module.exports = {
  index: groupsIndex,
  show: groupsShow
};
