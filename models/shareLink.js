import mongoose from "mongoose";

const shareLinkSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  file: { type: mongoose.Schema.Types.ObjectId, ref: "File", required: true },
  createdAt: { type: Date, default: Date.now },
});

shareLinkSchema.index({ createdAt: 1 }, { expireAfterSeconds: 43200 });

const ShareLink = mongoose.model("ShareLink", shareLinkSchema);
export default ShareLink;
