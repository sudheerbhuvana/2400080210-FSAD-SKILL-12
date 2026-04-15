import { useState, useEffect } from 'react';
import { User, Mail, BookOpen, Save, X } from 'lucide-react';

function EditStudent({ student, onUpdate, onCancel }) {
  const [form, setForm] = useState({ name: '', email: '', course: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student) {
      setForm({ name: student.name, email: student.email, course: student.course });
    }
  }, [student]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.course) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      await onUpdate(student.id, form);
    } catch (err) {
      setError('Unable to update student record. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="card form-card shadow-lg">
      <div className="card-header">
        <h2 className="card-title">
            <User size={20} className="text-accent" />
            Edit Student Profile
        </h2>
        <span className="badge badge-warning">Record ID: {student?.id}</span>
      </div>

      {error && <div className="alert alert-error">
        <span>{error}</span>
      </div>}

      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label htmlFor="edit-name">
            <User size={14} />
            Full Name
          </label>
          <input
            id="edit-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-email">
            <Mail size={14} />
            Email Address
          </label>
          <input
            id="edit-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-course">
            <BookOpen size={14} />
            Course
          </label>
          <input
            id="edit-course"
            type="text"
            name="course"
            value={form.course}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="btn-row">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (
                <>
                <Save size={18} />
                Update Profile
                </>
            )}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            <X size={18} />
            Cancel Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;
