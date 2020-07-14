const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = {
  authenticate,
  create,
  update,
  delete: _delete,
};

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

async function authenticate({ email, password }) {
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ _id: user._id }, process.env.SESSION_SECRET);

    return {
      ...user.toJSON(),
      token,
    };
  }
}

async function create(userParam) {
  // validate
  if ("password" in userParam && "email" in userParam) {
    if (userParam.password.length < 8) {
      throw {
        status: 422,
        message: "Password must be at least 8 characters long",
      };
    }
    if (!validateEmail(userParam.email)) {
      throw {
        status: 422,
        message: "Invalid email",
      };
    }
    if (await User.findOne({ email: userParam.email })) {
      throw { status: 409, message: "This email is already taken" };
    }
  } else {
    throw {
      status: 400,
      message: "All required fields should be filled out",
    };
  }

  const user = await User.create({
    password: bcrypt.hashSync(userParam.password),
    email: userParam.email,
  });

  return user;
}

async function update(id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) throw "User not found";
  if (
    user.email !== userParam.email &&
    (await User.findOne({ email: userParam.email }))
  ) {
    throw "This email is already taken";
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.password = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}
