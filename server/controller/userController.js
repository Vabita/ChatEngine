import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

const register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    // Checking if username or email already exist
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the user document to the database
    const user = await newUser.save();

    // Remove the password field from the returned user object(extracting the password and storing the remaining data into the userData)
    const { password: _password, ...userData } = user.toObject();
    // console.log(userData);

    //here it return the response to the client
    return res.json({ status: true, user: userData });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);

    // Checking if username or email already exist
    const userL = await User.findOne({ username });
    if (!userL) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }

    const isPasswordValid = await bcrypt.compare(password, userL.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    // Remove the password field from the returned user object(extracting the password and storing the remaining data into the userData)
    const { password: _password, ...userData } = userL.toObject();
    //here it return the response to the client
    return res.json({ status: true, user: userData });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      Image: userData.avatarImage
    })
  } catch (ex) {
    next(ex);
  }
};

//I'm gonna call this api from the chat.jsx(getting all user id except our id)
const allUsers = async (req, res, next) => {
  try{
    //getting all user id except our id
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id"
    ]);
    return res.json(users);
  }catch(ex){
    next(ex);
  }
};

export { register, login, setAvatar, allUsers };
