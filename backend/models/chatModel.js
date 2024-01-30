import { Schema, model } from 'mongoose';

const chatModel = Schema(
  {
    chat: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    lastestMessage: {
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
