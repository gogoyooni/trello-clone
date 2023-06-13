const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
  workspace: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    _id: mongoose.Schema.Types.ObjectId, // workspace id,
    name: String,
    website: String,
    description: String,
    isOwner: Boolean, // 이걸로 내가 초대되거나 소유하고 있는 워크스페이스에서 나의 역할 확인가능(주인 or 멤버) - 내가 초대된 워크스페이스에선 주인이 될 수 없음
    // isAdmin: Boolean, // 내가 초대된 워크스페이스에서 소유주의 권한에 따라 어드민은 가능함
    // isMember: Boolean, // 멤버는 default 값
    boards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
      },
    ],
    team: [
      {
        memberId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        isAdmin: Boolean,
        isMember: Boolean,
      },
    ],
  },
});

module.exports = mongoose.model("Workspace", workspaceSchema);
