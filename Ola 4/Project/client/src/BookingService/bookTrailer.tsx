import React, { useState } from 'react';
import './booking.css';
import { addBooking } from '../utils/addBooking';
import { BookTrailerForm } from '../types/types';


const BookTrailer: React.FC = () => {
  const [form, setForm] = useState<BookTrailerForm>({
    trailerId: '',
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

  const handleAddBooking = async () => {
    try {
      
      await addBooking(form);
 
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };


  return (
    <form onSubmit={handleAddBooking}>
      <div className='book-input-div'>
        <label htmlFor="location">Location:</label>
        <select name="location" id="location" value={"value"} onChange={handleInputChange}>
          <option value="">Select a location</option>
          <option value="location_a">Location A</option>
          <option value="location_b">Location B</option>
          <option value="location_c">Location C</option>
        </select>
      </div>

      <div className='book-input-div'>
        <label htmlFor="trailerId">Trailer:</label>
        <select name="trailerId" id="trailerId" value={form.trailerId} onChange={handleInputChange} required>
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
