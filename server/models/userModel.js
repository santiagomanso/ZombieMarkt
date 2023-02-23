import mongoose from 'mongoose'

const randomImage = () => {
  const images = [
    'https://i.ibb.co/GQDXp1X/aksdasdj-default-user-profile-picture-zombie-style-fun-ux-no-ge-ad402b67-e1fd-482d-b429-a2601634eebe.png',
    'https://i.ibb.co/wSPJ6WQ/aksdasdj-default-user-profile-girl-zombie-style-c97e338c-dcf6-49e0-a180-111910131ef9-removebg-previe.png',
  ]
  return images[Math.floor(Math.random() * images.length)]
}

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
    image: {
      type: String,
      required: false,
      default: randomImage(),
    },
    // favorites:[]
    // joined date
    //money spent
    //ofertas particulares
    //array favoritos
  },
  {
    timestamps: true,
  },
)

const User = mongoose.model('user', userSchema)
export default User
