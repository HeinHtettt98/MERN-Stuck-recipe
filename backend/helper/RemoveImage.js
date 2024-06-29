const fs = require("fs").promises;

const removeImage = async (path) => {
  let imageExit;
  try {
    await fs.access(path);
    imageExit = true;
  } catch (error) {
    imageExit = false;
  }

  if (imageExit) {
    await fs.unlink(path);
  }
};

module.exports = removeImage;
