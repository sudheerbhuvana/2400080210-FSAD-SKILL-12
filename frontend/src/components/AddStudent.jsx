import { useState } from 'react';
import { UserPlus, User, Mail, BookOpen, Save } from 'lucide-react';

function AddStudent({ onAdd }) {
  const [form, setForm] = useState({ name: '', email: '', course: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

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
      await onAdd(form);
      setSuccess(`Record for "${form.name}" has been successfully added.`);
      setForm({ name: '', email: '', course: '' });
    } catch (err) {
      setError('Unable to add student record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card form-card shadow-lg">
      <div className="card-header">
        <h2 className="card-title">
            <UserPlus size={20} className="text-accent" />
            Add New Record
        </h2>
      </div>

      {error && <div className="alert alert-error">
        <span>{error}</span>
      </div>}
      {success && <div className="alert alert-success">
        <span>{success}</span>
      </div>}

      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label htmlFor="add-name">
            <User size={14} />
            Full Name
          </label>
          <input
            id="add-name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="add-email">
            <Mail size={14} />
            Email Address
          </label>
          <input
            id="add-email"
            type="email"
            name="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="add-course">
            <BookOpen size={14} />
            Course
          </label>
          <input
            id="add-course"
            type="text"
            name="course"
            placeholder="Computer Science"
            value={form.course}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-full shadow-sm" disabled={loading}>
          {loading ? 'Processing...' : (
              <>
                <Save size={18} />
                Save Student Record
              </>
          )}
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
