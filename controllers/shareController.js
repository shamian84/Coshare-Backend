import File from "../models/fileUpload.js";

export const shareWithUsers = async (req, res) => {
  const { userIds } = req.body;

  if (!Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).json({
      message: "userIds array is required",
    });
  }

  const file = await File.findById(req.params.id);

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  if (file.owner.toString() !== req.user) {
    return res.status(403).json({ message: "Only owner can share file" });
  }

  userIds.forEach((userId) => {
    if (!file.sharedWith.some((u) => u.user.toString() === userId)) {
      file.sharedWith.push({ user: userId });
    }
  });

  await file.save();

  res.json({ message: "File shared successfully" });
};
