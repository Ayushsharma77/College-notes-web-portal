const express = require("express");
const router  = express.Router();

const BRANCHES = [
  { code: "CSE",     name: "Computer Science & Engineering",          years: 4 },
  { code: "CSE-AI",  name: "CSE (Artificial Intelligence)",           years: 4 },
  { code: "CSE-DS",  name: "CSE (Data Science)",                      years: 4 },
  { code: "CSE-IoT", name: "CSE (Internet of Things)",                years: 4 },
  { code: "ECE",     name: "Electronics & Communication Engineering",  years: 4 },
  { code: "EE",      name: "Electrical Engineering",                   years: 4 },
  { code: "MECH",    name: "Mechanical Engineering",                   years: 4 },
  { code: "CIVIL",   name: "Civil Engineering",                        years: 4 },
  { code: "IT",      name: "Information Technology",                   years: 4 },
];

router.get("/", (req, res) => {
  res.json({ success: true, data: BRANCHES });
});

module.exports = router;
