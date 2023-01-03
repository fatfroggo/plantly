const db = require("../../db/connection");
import fetch from "node-fetch";
exports.selectRedditPosts = () => {
  return fetch(`https://www.reddit.com/r/houseplants/hot.json`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const reddit_array = data.data.children;

      const formatted_array = [];
      for (let i = 0; i < reddit_array.length; i++) {
        const formatted_object = {};
        const reddit_object = reddit_array[i].data;
        if (reddit_object.url_overridden_by_dest === undefined) {
          continue;
        }

        (formatted_object.subreddit = reddit_object.subreddit),
          (formatted_object.author = reddit_object.author_fullname),
          (formatted_object.title = reddit_object.title),
          (formatted_object.votes = reddit_object.ups),
          (formatted_object.total_awards_received =
            reddit_object.total_awards_received),
          (formatted_object.score = reddit_object.score),
          (formatted_object.thumbnail = reddit_object.thumbnail),
          (formatted_object.img = reddit_object.url_overridden_by_dest),
          (formatted_object.link_to_reddit_post = reddit_object.url),
          formatted_array.push(formatted_object);
      }
      return formatted_array;
    })
    .catch(() => {
      return Promise.reject({
        status: 404,
        msg: "Not found",
      });
    });
};
