const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { protect } = require("./middleware/authMiddleware");

require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

mongoose.connect(process.env.DATABASE_URL);

app.use("/api/auth/users", require("./routes/userRoutes"));
app.use("/api/user", require("./routes/workspaceRoutes"));
app.use("/api/user", require("./routes/boardRoutes.js"))

app.get("/", async (req, res) => {
  // res.send("root route");
  res.json({ message: "root route" });
  // const { query } = req;
  // console.log(query);
});

app.post("/", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  res.send(username);
});

app.post("/api/auth/signup", async (req, res) => {
  // console.log(req.body);
  const { signupUsername, signupPassword } = req.body;

  // console.log(signupPassword);

  try {
    // Check if the username is already taken
    // Confirm data
    if (!signupUsername || !signupPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate username
    const User = require("./models/User");

    // const query = User.where({ username: username });
    // const existingUser = await query.findOne();

    const existingUser = await User.findOne({ username: signupUsername });

    console.log("exisitngUser: ", existingUser);

    if (existingUser)
      return res.status(409).json({ message: "This username already exists." });

    // Hash the password
    const hashedPassword = await bcrypt.hash(signupPassword, 10);
    console.log("hased pw: ", hashedPassword);

    // const boardData = {
    //   id: "qwelkjqwelkqjwe",
    //   name: "트렐로",
    //   data: [
    //     {
    //       id: "qwelkqjweklqwe",
    //       column: 1,
    //       title: "컬럼1",
    //       tasks: [
    //         {
    //           title: "컬럼1의 카드1의 타이틀",
    //           description: "컬럼1의 카드1의 설명부분",
    //         },
    //       ],
    //     },
    //   ],
    // };

    // const newUser = new User({
    //   signupUSERNAME,
    //   password: hashedPassword,
    // });

    // await newUser.save();
    const userObject = { username: signupUsername, password: hashedPassword };

    const newUser = await User.create(userObject);

    console.log("new User: ", newUser);

    if (newUser) {
      return res
        .status(201)
        .json({ message: `New user ${signupUsername} has been created` });
    } else {
      return res.status(400).json({ message: "Invalid user data received" });
    }

    // Return the token to the client
    // return res.status(201).json({ token });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// Login route
app.post("/api/auth/login", async (req, res) => {
  // console.log(req.body);
  const { loginUsername, loginPassword } = req.body.data;
  // console.log(username);
  // console.log(req.body.data);

  try {
    // Find user in the database
    // const user = await User.findOne({ username: username });

    // const user = await User.findOne({ username: username }).exec();

    const user = await User.findOne({ username: loginUsername });
    // console.log("api/auth/login- userFound", user);

    // console.log(user);
    // return res.status(200).json({ message: "same username exists!" });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // // Compare the provided password with the stored hashed password

    // const hashedPassword = await bcrypt.hash(password, 10);
    const passwordMatch = await bcrypt.compare(loginPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }
    // // Create and sign a JWT token
    // const token = jwt.sign({ userId: user._id }, "secretKey");
    // // Return the token to the client
    // return res.status(200).json({ token });

    // Create and sign an access token
    const accessToken = jwt.sign(
      { username: loginUsername },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    );

    // Create and sign a refresh token
    const refreshToken = jwt.sign(
      { username: loginUsername },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, // accessible only by the webserver
      secure: true, //https
      samesite: "None", // cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry: set to
    });

    res.json({ username: user.username, accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/api/auth/refresh", async (req, res) => {
  const cookie = req.cookies;
  console.log("cookie: ", cookie.jwt);

  if (!cookie?.jwt) return res.status(401).json("message: Unauthorized");
  const refreshToken = cookie.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (error, decoded) => {
      try {
        if (error) return res.status(403).json({ message: "Forbidden" });

        const User = require("./models/User");

        const foundUser = await User.findOne({
          username: decoded.username,
        });

        if (!foundUser)
          return res.status(401).json({ message: "Unauthorized" });

        const accessToken = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1m",
          }
        );

        res.json({ accessToken });
      } catch (e) {
        console.error("Error during refresh token process:", e);
        return res.status(500).json({ message: "Internal server error." });
      }
    }
  );
});

// to clear the cookie if exists
app.post("/api/auth/logout", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // no content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
});

app.get("/api/boards", protect, async (req, res) => {
  const Board = require("./models/Board");

  // const newBoard = new Board({
  //   name: "보드 타이틀",
  //   user: "64754fb7be228c52ebe5ff0b",
  //   data: [
  //     {
  //       column: 1,
  //       title: "칼럼1의 타이틀",
  //       tasks: [
  //         {
  //           taskId: "64755c14645f1fab7b648e1e",
  //           title: "칼럼1의 태스크1의 타이틀",
  //           description: "디스크립션 설명",
  //         },
  //       ],
  //     },
  //   ],
  // });

  // await newBoard.save();

  const boards = await Board.find();

  console.log("boards:", boards);
  res.status(200).json(boards);
});

//@ workspace api

app.post("/api/workspace/:id", async (req, res) => {
  const { id } = req.params;
  const { name, website, description } = req.body.data;
  console.log(id, name, website, description);

  const User = require("./models/User");

  const newData = {
    name: name,
    website: website,
    description: description,
  };

  const updatedWorkspace = await User.findOneAndUpdate(
    { username: id },
    { $push: { workspaces: newData } }
  );
  console.log("updated workspace :", updatedWorkspace);
});

// // Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
