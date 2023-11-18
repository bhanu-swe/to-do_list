import express from "express";
import bodyParser
 from "body-parser";

const app = express();
const port = 3000;

// Use express.urlencoded middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Initialize an empty array to store tasks
const t_home = [];
const t_work = [];
let completed_home=[];
let completed_work=[];
const ans="false";

// Display the to-do list
app.get("/", (req, res) => {
  res.render("index.ejs");
});


app.get("/home",(req,res)=>{
  res.render("home.ejs",{t_home,completed_home});
})
app.get("/work",(req,res)=>{
  res.render("work.ejs",{t_work,completed_work});
})
// Add a new task
app.post("/add-task_home", (req, res) => {
  const newTask = req.body.task;
  t_home.push(newTask);
  completed_home.push(0);
  res.redirect("/home");
});

app.post("/add-task_work", (req, res) => {
  const newTask = req.body.task;
  t_work.push(newTask);
  completed_work.push(0);
  res.redirect("/work");
});


app.post('/update-completed', (req, res) => {
  const taskIndex = parseInt(req.body.index);
  const isChecked = req.body.isChecked === 'true';
  if (isChecked) {
      completed_home[taskIndex] = 1;
  } else {
      completed_home[taskIndex] = 0;
  }
  // Respond with a success status
  res.sendStatus(200);
});

app.post('/update-completed_work', (req, res) => {
  const taskIndex = parseInt(req.body.index);
  const isChecked = req.body.isChecked === 'true'; // 
  if (isChecked) {
      completed_work[taskIndex] = 1;
  } else {
      completed_work[taskIndex] = 0;
  }

  // Respond with a success status
  res.sendStatus(200);
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
