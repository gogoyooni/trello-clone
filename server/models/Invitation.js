const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  link: String, // 초대할때 보안을 위해서 링크 보내는데 이 링크를 disable할 수 있도록 하기 -> 링크가 있으면 disable안된거고 있으면 able한 상태인거임
  invitedBy: [
    // 워크스페이스 요청 받은거 (피동))
    {
      invitorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      invitorUsername: {
        type: String,
        require: true,
      },
      sentAt: { type: Date, default: Date.now },
      accepted: Boolean, //요청 받은 사람이 수락을 했는지 여부 -> 수락하면 초대된 워크스페이스에 들어가게 되
      closed: Boolean, // 이게 true면 요청 승인 또는 거절이 끝났다는거임 -> 데이터용으로 남겨놓기
    },
  ],
  invited: [
    // 워크스페이스에 요청한거 (능동)
    {
      inviteeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      inviteeUsername: {
        type: String,
        required: true,
      },
      sentAt: { type: Date, default: Date.now },
      isAccepted: Boolean, // 상대방이 요청 수락 후엔 해당 워크스페이스에 추가하고 invited true 또는 false
      closed: Boolean,
    },
  ],
});

module.exports = mongoose.model("Invitation", invitationSchema);
