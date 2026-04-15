import { GraduationCap, Edit, Trash2, BookOpen, User, AlertCircle, Check, X } from 'lucide-react';
import { useState } from 'react';

function StudentList({ students, onDelete, onEdit }) {
  const [confirmDelete, setConfirmDelete] = useState(null);

  if (students.length === 0) {
    return (
      <div className="card empty-state">
        <div className="empty-icon">
            <GraduationCap size={48} />
        </div>
        <h3>No Records Found</h3>
        <p>Start managing your students by adding a new record.</p>
      </div>
    );
  }

  return (
    <div className="card shadow-lg">
      <div className="card-header">
        <h2 className="card-title">
            <User size={20} className="text-accent" />
            Student Directory
        </h2>
        <span className="badge">{students.length} Total Records</span>
      </div>
      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Enrolled Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id} className="table-row">
                <td className="id-cell">{student.id}</td>
                <td className="name-cell">{student.name}</td>
                <td className="email-cell">{student.email}</td>
                <td>
                    <span className="course-tag">
                        <BookOpen size={14} />
                        {student.course}
                    </span>
                </td>
                <td className="actions-cell">
                  {confirmDelete === student.id ? (
                    <div className="confirm-actions">
                      <span className="confirm-text">Are you sure?</span>
                      <button
                        className="btn btn-delete btn-sm"
                        onClick={() => {
                          onDelete(student.id);
                          setConfirmDelete(null);
                        }}
                      >
                        <Check size={14} />
                        Confirm
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setConfirmDelete(null)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        className="btn btn-edit"
                        onClick={() => onEdit(student)}
                        title="Modify record"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => setConfirmDelete(student.id)}
                        title="Delete record"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
