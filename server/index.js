const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

async function main() {
  await prisma.$connect();
  //   console.log("connection: ", connection);
  //   console.log("prisma", prisma);

  //Create the first post
  // const user = await prisma.user.create({
  //   data: {
  //     username: "taeyun",
  //     email: "taeyoon@gmail.com",
  //     password: "123456",
  //   },
  // });
  // console.log("user", user);

  // Read all the users
  // const users = await prisma.user.findMany();
  // console.log(users);

  // const user = await prisma.user.findFirst({
  //   where: {
  //     email: "duxodbs12@naver.com",
  //   },
  // });

  // console.log(user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

/*

*/

app.get("/", async (req, res) => {
  res.send("root route");
  // const { query } = req;
  // console.log(query);
});

app.post("/", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  res.send(username);
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    console.log(existingUser);

    if (existingUser)
      return res.status(400).json({ message: "Username already exists." });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    // const newUser = new User({
    //   username,
    //   password: hashedPassword,
    // });

    // await newUser.save();

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    console.log("user 만들어짐", newUser);

    // Create and sign a JWT token
    const token = jwt.sign({ userId: newUser._id }, "secretKey"); // 이건 로그인할때 쓰는거인듯

    return res.status(201).json({ message: "회원가입 성공!", token });

    // Return the token to the client
    // return res.status(201).json({ token });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // console.log(username);
  console.log(req.body);

  try {
    // Find user in the database
    // const user = await User.findOne({ username });
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    // console.log(user);
    // return res.status(200).json({ message: "same username exists!" });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }
    // // Create and sign a JWT token
    // const token = jwt.sign({ userId: user._id }, "secretKey");
    // // Return the token to the client
    // return res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// // Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
