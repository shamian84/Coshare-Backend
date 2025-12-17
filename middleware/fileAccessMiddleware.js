import File from "../models/fileUpload";

export const checkFilesAccess = async (req, res, next) => {
  const file = await File.findById(req.params.id);

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }
  const userId = req.user;

  const isOwner = file.owner.toString() === req.userId;
  const isShared = file.sharedWith.some(
    (entry) => entry.user.toString() === req.userId
  );
  if (!isOwner && !isShared) {
    return res.status(403).json({ message: "Access denied" });
  }

  req.fileDoc = file;
  next();
};
