const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const { id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const avatar = await Jimp.read(tmpUpload);
    const resultUpload = path.join(avatarsDir, imageName);
    await avatar.resize(250, 250).write(resultUpload);
    await fs.unlink(tmpUpload);

    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user.id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};

module.exports = updateAvatar;
