const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    }, // String is shorthand for {type: String}
    password: {
      type: String,
      required: true,
    },
    invitation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invitation",
      },
    ],
    // favoriteBoards: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Board",
    //   },
    // ],
    // invitedBy: [
    //   // 워크스페이스 요청 받은거 (피동))
    //   {
    //     invitorId: mongoose.Schema.Types.ObjectId,
    //     invitorUsername: String,
    //     sentAt: { type: Date, default: Date.now },
    //     accepted: Boolean, //요청 받은 사람이 수락을 했는지 여부 -> 수락하면 초대된 워크스페이스에 들어가게 되
    //     closed: Boolean, // 이게 true면 요청 승인 또는 거절이 끝났다는거임 -> 데이터용으로 남겨놓기
    //   },
    // ],
    // invited: [
    //   // 워크스페이스에 요청한거 (능동)
    //   {
    //     inviteeId: mongoose.Schema.Types.ObjectId,
    //     inviteeUsername: String,
    //     sentAt: { type: Date, default: Date.now },
    //     isAccepted: Boolean, // 상대방이 요청 수락 후엔 해당 워크스페이스에 추가하고 invited true 또는 false
    //     closed: Boolean,
    //   },
    // ],
    // boards: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Board",
    //   },
    // ],
    workspaces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
      },
      // {
      //   // id: mongoose.Schema.Types.ObjectId, // workspace id
      //   name: {
      //     type: String,
      //   },
      //   website: {
      //     type: String,
      //   },
      //   description: {
      //     type: String,
      //   },
      //   isOwner: {
      //     type: Boolean, // 이걸로 내가 초대되거나 소유하고 있는 워크스페이스에서 나의 역할 확인가능(주인 or 멤버) - 내가 초대된 워크스페이스에선 주인이 될 수 없음
      //   },
      //   // isAdmin: Boolean, // 내가 초대된 워크스페이스에서 소유주의 권한에 따라 어드민은 가능함
      //   // isMember: Boolean, // 멤버는 default 값
      //   boards: [
      //     {
      //       type: mongoose.Schema.Types.ObjectId,
      //       ref: "Board",
      //     },
      //   ],
      //   team: [
      //     {
      //       memberId: {
      //         type: mongoose.Schema.Types.ObjectId,
      //         required: true,
      //       },
      //       isAdmin: Boolean,
      //       isMember: Boolean,
      //     },
      //   ],
      // },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//     }, // String is shorthand for {type: String}
//     password: {
//       type: String,
//       required: true,
//     },
//     invitedBy: [
//       // 워크스페이스 요청 받은거 (피동))
//       {
//         invitorId: mongoose.Schema.Types.ObjectId,
//         invitorUsername: String,
//         sentAt: { type: Date, default: Date.now },
//         accepted: Boolean, //요청 받은 사람이 수락을 했는지 여부 -> 수락하면 초대된 워크스페이스에 들어가게 되
//         closed: Boolean, // 이게 true면 요청 승인 또는 거절이 끝났다는거임 -> 데이터용으로 남겨놓기
//       },
//     ],
//     invited: [
//       // 워크스페이스에 요청한거 (능동)
//       {
//         inviteeId: mongoose.Schema.Types.ObjectId,
//         inviteeUsername: String,
//         sentAt: { type: Date, default: Date.now },
//         isAccepted: Boolean, // 상대방이 요청 수락 후엔 해당 워크스페이스에 추가하고 invited true 또는 false
//         closed: Boolean,
//       },
//     ],
//     // boards: [
//     //   {
//     //     boardId: mongoose.Schema.Types.ObjectId,
//     //     name: String,
//     //   },
//     // ],
//     workspaces: [
//       // 일단 워크스페이스에 초대된 멤버는 보드에 모두 접근 가능하게 하자
//       {
//         id: mongoose.Schema.Types.ObjectId, // workspace id
//         name: String,
//         isOwner: Boolean, // 이걸로 내가 초대되거나 소유하고 있는 워크스페이스에서 나의 역할 확인가능(주인 or 멤버) - 내가 초대된 워크스페이스에선 주인이 될 수 없음
//         isAdmin: Boolean, // 내가 초대된 워크스페이스에서 소유주의 권한에 따라 어드민은 가능함
//         isMember: Boolean, // 멤버는 default 값
//         boards: [
//           {
//             boardId: mongoose.Schema.Types.ObjectId,
//             name: String,
//           },
//         ],
//         team: [
//           {
//             memberId: mongoose.Schema.Types.ObjectId,
//             isMember: Boolean,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("User", userSchema);
