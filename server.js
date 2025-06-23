const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Load Excel file
const workbook = xlsx.readFile("users.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const users = xlsx.utils.sheet_to_json(sheet);

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.send("Login successful!");
  } else {
    res.send("Invalid credentials.");
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
