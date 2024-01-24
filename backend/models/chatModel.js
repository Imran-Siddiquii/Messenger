import { Schema, model } from 'mongoose';

const chatModel = Schema(
  {
    chat: {
      type: String,
      trim: true,
    },
    isGroupAdmin: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    lastmessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
    groupAdmin: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Chat = model('Chat', chatModel);
export default Chat;
