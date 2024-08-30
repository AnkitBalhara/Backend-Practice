const ShortURL_Model = require("../Models/model");
const shortid = require("shortid");

async function handlGetRequestByShortId(req, res) {
  let shortid = req.params.shortid;
  let result = await ShortURL_Model.findOneAndUpdate(
    { ShortedURL: shortid },
    {
      $push: { visited: { timestamps: Date.now() } },
    }
  );
  res.redirect(result.redirectURL);
}

async function handleGetAnalytics(req, res) {
  let shortid = req.params.shortid;
  let result = await ShortURL_Model.findOne({ ShortedURL: shortid });
  res.json({ Total_Visits: result.visited.length ,
    analytics:result.visited
  });
}

async function handlePostRequestForAllUsers(req, res) {
  let bodyData = req.body;
  const SHORTID = shortid.generate();
  if (!bodyData.url) {
    return res.status(401).json({ Error: "Enter URL..." });
  }

  await ShortURL_Model.create({
    ShortedURL: SHORTID,
    redirectURL: bodyData.url,
    visited: [],
  });

  return res.json({ id: SHORTID });
}

module.exports = {
  handlGetRequestByShortId,
  handlePostRequestForAllUsers,
  handleGetAnalytics,
};
