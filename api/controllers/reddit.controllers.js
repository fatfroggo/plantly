const { selectRedditPosts } = require("../models/reddit.models");

exports.getReddit = (req, res, next) => {
 
  selectRedditPosts()
    .then((post_array) => {
      res.status(200).send({ post_array });
    })
    .catch(next);
};



