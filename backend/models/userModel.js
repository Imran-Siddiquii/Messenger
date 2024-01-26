import { Schema, model } from 'mongoose';

const phoneSchema = /^[0-9]{10}$/;

const isStrongPassword = (value) => {
  // Ensure the password has at least 6 characters, including at least one letter and one digit
  const hasMinimumLength = value.length >= 6;
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasDigit = /\d/.test(value);
  return hasMinimumLength && hasLetter && hasDigit;
};

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
    password: {
      type: String,
      required: [true, 'Password is required'],
      validate: [
        isStrongPassword,
        'Password should have at least 6 characters and include at least one letter and one digit',
      ],
    },
  },
  { timestamps: true }
);

const User = model('User', userModel);
export default User;
