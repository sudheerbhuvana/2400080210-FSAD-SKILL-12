import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, UserPlus, Edit, GraduationCap } from 'lucide-react';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import './index.css';

const API_URL = 'http://localhost:8083/students';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('list');

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = async (student) => {
    await axios.post(API_URL, student);
    fetchStudents();
  };

  const handleUpdate = async (id, student) => {
    try {
      await axios.put(`${API_URL}/${id}`, student);
      setEditingStudent(null);
      setActiveTab('list');
      fetchStudents();
    } catch (err) {
      console.error('Error updating student:', err);
      alert('Failed to update student. Please check the console for details.');
    }
  };

  const handleDelete = async (id) => {
    console.log('Attempting to delete student with ID:', id);
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      console.log('Delete response:', response.data);
      fetchStudents();
    } catch (err) {
      console.error('Error deleting student:', err);
      alert('Failed to delete student. ' + (err.response?.data || err.message));
    }
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setActiveTab('list'); // Switch to list if needed, or stay on edit
    setActiveTab('edit');
  };

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="logo-area">
            <div className="logo-icon">
                <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="app-title">StudentHub</h1>
              <p className="app-subtitle">Corporate Management System</p>
            </div>
          </div>
          <div className="header-badge">
            <Users size={16} />
            <span>{students.length} Students</span>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          <Users size={18} />
          Student List
        </button>
        <button
          className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => { setActiveTab('add'); setEditingStudent(null); }}
        >
          <UserPlus size={18} />
          Add Student
        </button>
        {editingStudent && (
          <button
            className={`tab-btn ${activeTab === 'edit' ? 'active' : ''}`}
            onClick={() => setActiveTab('edit')}
          >
            <Edit size={18} />
            Edit Student
          </button>
        )}
      </nav>

      {/* Main Content */}
      <main className="app-main">
        {activeTab === 'list' && (
          <StudentList
            students={students}
            onDelete={handleDelete}
            onEdit={handleEditClick}
          />
        )}
        {activeTab === 'add' && (
          <AddStudent
            onAdd={(s) => { handleAdd(s); setActiveTab('list'); }}
          />
        )}
        {activeTab === 'edit' && editingStudent && (
          <EditStudent
            student={editingStudent}
            onUpdate={handleUpdate}
            onCancel={() => { setEditingStudent(null); setActiveTab('list'); }}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Practical 12 — Full-Stack CRUD · React + Spring Boot</p>
      </footer>
    </div>
  );
}

export default App;
