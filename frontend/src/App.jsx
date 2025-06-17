import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import StudentDashboard from "./Pages/StudentDashboard";
import TeacherDashboard from "./Pages/TeacherDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import ManageStudents from './Components/adminwork/ManageStudents';
import ManageTeachers from './Components/adminwork/ManageTeachers';
import ManageSubjects from './Components/adminwork/ManageSubjects';
import Visualization from "./Pages/Visualization";  // Import Visualization
import StudentSubjectMarks from "./Pages/StudentSubjectMarks";
import TeacherSubject from "./Pages/TeacherSubject";
import EnterMarks from "./Pages/TeacheRSubjectMarks";
import AddStudent from "./Components/adminwork/addstudent";
import StudentList from "./Components/adminwork/studentlist";
import AddTeacher from "./Components/adminwork/addteacher";
import TeacherList from "./Components/adminwork/teacherslist";
import AddSubject from "./Components/adminwork/addsubject";
import SubjectList from "./Components/adminwork/subjectlist";
import Register from "./Pages/Register";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Adjusted route for the Visualization page */}
          <Route
            path="/studentdashboard/visualization"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Visualization />
              </ProtectedRoute>
            }
          />

          <Route
            path="/studentsubjectmarks/:subjectName"
            element={<StudentSubjectMarks />}
          />

          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/enter-marks/:subjectName"
            element={<EnterMarks />}
          />

          <Route
            path="/teacher-subjects"
            element={<TeacherSubject />}
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/manage-students" element={<ManageStudents />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/student-list" element={<StudentList />} />
          <Route path="/manage-teachers" element={<ManageTeachers />} />
          <Route path="/add-teacher" element={<AddTeacher />} />
          <Route path="/teacher-list" element={<TeacherList />} />
          <Route path="/manage-subjects" element={<ManageSubjects />} />
          <Route path="/add-subject" element={<AddSubject />} />
          <Route path="/subject-list" element={<SubjectList />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
