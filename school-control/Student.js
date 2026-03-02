import { Schema, model } from "mongoose";
const studentSchema = new Schema(
  {
    student_id: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    lastname: String,
    grade: Number,
    group: String,
    average: Number,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default model("student", studentSchema);
