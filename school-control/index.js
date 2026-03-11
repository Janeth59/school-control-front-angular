import express from "express";
import Student from "./Student.js";
import "./database.js";
import cors from "cors";
const app = express();

//Settings
app.set("port", process.env.PORT || 3500);
//Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

//Routes
//Insertar un estudiante
app.post("/insertOne", async (req, res) => {
  //Procesamiento de la petición
  console.log(req.body);
  const studentSaved =await Student.create(req.body);
  res.json(studentSaved);
  console.log(studentSaved);
});
//Obtener todos los estudiantes
app.get("/getAll", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});
//Obtener un estudiante por su id
app.get("/getOne/:num_control", async (req, res) => {
  const student = await Student.findOne({ student_id: req.params.num_control });
  if (student) res.json({ data: student });
  else res.status(404).json({ message: "Student not found" });
});

//Actualizar un estudiante por su id
app.put("/updateOne/:num_control", async (req, res) => {
  //Procesamiento de la petición
  const result = await Student.findOneAndUpdate(
    { student_id: req.params.num_control },
    req.body
  );
  //Enviar respuesta
  if (result) {
    res.json({
      message: "Student updated",
      data: result,
    });
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});


app.delete("/deleteOne/:num_control", async (req, res)=> {
  const result = await Student.findOneAndDelete({
    student_id: req.params.num_control,

  });
  console.log(result)
  if (result){
    res.json(result);
  }else{
    res.status(404).json({message: "Student not found"});
  }
});




//Start server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});