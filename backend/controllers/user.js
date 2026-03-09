const User = require("../models/User");

// use the "require" directive to load the bcryptjs module/package that allows us to encrypt information
const bcrypt = require("bcryptjs");
const auth = require("../auth");

//Register a new user
module.exports.registerUser = (req, res) => {
  // create a variable called "newUser" and instantiate a new "User" object using the "User" model
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    // hashSync() method is used to encrypot information.
    // 10 is the number of "salt" rounds
    password: bcrypt.hashSync(req.body.password, 10),
    mobileNo: req.body.mobileNo,
  });

  if (!req.body.email.includes("@")) {
    return res.status(400).send({ error: "Email invalid" });
  }
  // Checks if the mobile number has the correct number of characters
  if (req.body.mobileNo.length !== 11) {
    return res.status(400).send({ error: "Mobile number invalid" });
  }
  // Checks if the password has atleast 8 characters
  if (req.body.password.length < 8) {
    return res
      .status(400)
      .send({ error: "Password must be atleast 8 characters" });
    // If all needed requirements are achieved
  }

  // save the newUser obejct in our database
  // if the save is successful, the newUser document will be stored in the "user" variable
  // 201 status code means created. this means that a new resource is created.
  return newUser
    .save()
    .then((user) => {
      return res.status(201).send({ message: "Registered Successfully" });
    })
    .catch((saveErr) => {
      console.error("Error in Saving the user:", saveErr);
      return res.status(500).send({ error: "Error in Save" });
    });
};
//Log/Authenticate a user
module.exports.loginUser = (req, res) => {
  // if the user email given in the request body contains "@"
  if (req.body.email.includes("@")) {
    // findOne() method return the first document in the collection that matches our search criteria
    return User.findOne({ email: req.body.email })
      .then((user) => {
        // If the user does not exist
        if (!user) {
          return res.status(404).send({ error: "No Email Found" });

          // If the user exists
        } else {
          // compareSync() method to compare the login password and the database password. it decrypts the database password and then compare it to the request body password. it will return true if it matches and will return false otherwise
          const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            user.password
          );

          // If the password matches
          if (isPasswordCorrect) {
            return res
              .status(200)
              .send({ access: auth.createAccessToken(user), user });

            // If the password does not match
          } else {
            // 401 status code means unauthorized. This means that the user is not authorized to acces the application. The credentials does not match
            return res
              .status(401)
              .send({ error: "Email and password do not match" });
          }
        }
      })
      .catch((findErr) => {
        console.error("Error in find:", findErr);
        return res.status(500).send({ error: "Error in find." });
      });

    // if the user email given in the request body does not contain "@"
  } else {
    return res.status(400).send({ error: "Invalid Email" });
  }
};
//Get the authenticated user profile
module.exports.getProfile = (req, res) => {
  // findyById() is similar to find({ _id: reqBody.id })
  return User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: `User not found` });
      } else {
        user.password = "";
        return res.status(200).send({ user });
      }
    })
    .catch((findErr) => {
      console.error("Error in finding the user: ", findErr);
      return res.status(500).send({ error: "Failed to fetch user profile." });
    });
};
//Change/Update a specific user by the admin
module.exports.updateUserToAdmin = (req, res) => {
  let updatedUser = {
    isAdmin: true,
  };

  return User.findByIdAndUpdate(req.params.id, updatedUser)
    .then((user) => {
      if (user) {
        res.status(200).send({ updatedUser: user });
      } else {
        return res.status(404).send({ message: "User not found" });
      }
    })
    .catch((saveErr) =>
      res.status(500).send({ error: "Failed in find", details: saveErr })
    );
};
//Reset/Change the user's password
module.exports.resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { id } = req.user; // Extracting user ID from the authorization header

    // Hashing the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Updating the user's password in the database
    await User.findByIdAndUpdate(id, { password: hashedPassword });

    // Sending a success response
    res.status(201).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports.getUserName = (req, res) => {
  // findyById() is similar to find({ _id: reqBody.id })
  return User.findById(req.body.userId)
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(404).send({ error: `User not found` });
      } else {
        user.password = "";
        return res.status(200).send({ user });
      }
    })
    .catch((findErr) => {
      console.error("Error in finding the user: ", findErr);
      return res.status(500).send({ error: "Failed to fetch user profile." });
    });
};
