import { Schema, model } from 'mongoose';

const phoneSchema = /^[0-9]{10}$/;

const userModel = Schema(
  {
    name: { type: String, trim: true },
    phone_number: {
      type: String,
      validate: {
        validator: function (phoneNumber) {
          return phoneSchema.test(phoneNumber);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, 'Phone number is required'],
      minlength: [10, 'Phone number should have at least 10 characters'],
      unique: true,
    },
    profile_picture: {
      type: String,
      default:
        'https://cdn.openart.ai/uploads/image_UDi_TT6t_1690816400544_512.webp',
    },
  },
  { timestamps: true }
);

const User = model('User', userModel);
export default User;
