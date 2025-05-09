import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => navigate('/manage-students')}>Manage Students</button>
      <button onClick={() => navigate('/manage-teachers')}>Manage Teachers</button>
      <button onClick={() => navigate('/manage-subjects')}>Manage Subjects</button>
      
    </div>
  );
}

export default AdminDashboard;
