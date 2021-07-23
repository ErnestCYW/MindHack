//This is a callback function
//Checks that we are sending valid information

module.exports = (req, res, next) => {
  const { email, name, password, password2, school } = req.body;

  let errors = {};

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    if (!email) {
      errors.email = "Email required";
    } else if (!validEmail(email)) {
      errors.email = "Email address is invalid";
    }

    if (!name) {
      errors.name = "Name required";
    }

    if (!password) {
      errors.password = "Password required";
    }

    if (!password2) {
      errors.password2 = "Password required";
    } else if (password !== password2) {
      errors.password2 = "Passwords do not match";
    }

    if (!school) {
      errors.school = "School required";
    }

    // Throw errors if any errors
    if (Object.keys(errors).length !== 0) {
      return res.json(errors);
    }
  } else if (req.path === "/login") {
    if (!email) {
      errors.email = "Email required";
    }

    if (!password) {
      errors.password = "Password required";
    }

    if (Object.keys(errors).length !== 0) {
      return res.json(errors);
    }
  }

  next();
};
