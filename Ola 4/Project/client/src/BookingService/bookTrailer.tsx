import React, { useState } from 'react';
import './booking.css';

interface BookTrailerForm {
  location: string;
  trailer: string;
  insurance: boolean;
}

const BookTrailer: React.FC = () => {
  const [form, setForm] = useState<BookTrailerForm>({
    location: '',
    trailer: '',
    insurance: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
  
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      setForm({
        ...form,
        [name]: e.target.checked,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form logic here
    console.log('Form submitted:', form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='book-input-div'>
        <label htmlFor="location">Location:</label>
        <select name="location" id="location" value={form.location} onChange={handleInputChange} required>
          <option value="">Select a location</option>
          <option value="location_a">Location A</option>
          <option value="location_b">Location B</option>
          <option value="location_c">Location C</option>
        </select>
      </div>

      <div className='book-input-div'>
        <label htmlFor="trailer">Trailer:</label>
        <select name="trailer" id="trailer" value={form.trailer} onChange={handleInputChange} required>
          <option value="">Select a trailer</option>
          <option value="trailer_a">Trailer A</option>
          <option value="trailer_b">Trailer B</option>
          <option value="trailer_c">Trailer C</option>
        </select>
      </div>

      <div className='book-input-div'>
        <label htmlFor="insurance">Insurance:</label>
        <input
          type="checkbox"
          name="insurance"
          id="insurance"
          checked={form.insurance}
          onChange={handleInputChange}
        />
      </div>
    <div className='book-input-div'>
      <button type="submit">Book Trailer</button>
      </div>
    </form>
  );
};

export default BookTrailer;
