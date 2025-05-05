import ManageStudents from "../Components/adminwork/ManageStudents";
import ManageTeachers from "../Components/adminwork/ManageTeachers";
import ManageSubjects from "../Components/adminwork/ManageSubjects";
import ManageMarks from "../Components/adminwork/ManageMarks";

function AdminDashboard() {
  return (
    <div>
      <Navbar />
      <h2>Admin Dashboard</h2>
      <ManageStudents />
      <ManageTeachers />
      <ManageSubjects />
      <ManageMarks />
    </div>
  );
}

export default AdminDashboard;
