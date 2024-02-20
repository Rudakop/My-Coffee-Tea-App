import React, { useState } from 'react';
import axios from 'axios';
import './CoffeeTeaForm.scss';

const CoffeeTeaForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [weight, setWeight] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [roastLevel, setRoastLevel] = useState<number>(1);
  const [pricePerKg, setPricePerKg] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const calculatedPricePerKg = (price / weight) * 1000;
      setPricePerKg(calculatedPricePerKg);

      const formData = {
        name,
        weight,
        price,
        roastLevel,
      };

      const response = await axios.post('http://localhost:3001/api/saveCoffeeTea', formData);

      if (response.status === 200) {
        setName('');
        setWeight(0);
        setPrice(0);
        setRoastLevel(1);

      } else {
        setError('Failed to save data');
      }
    } catch (error) {
      setError('Error while saving data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="coffee-tea-form">
      <h2>Add Coffee or Tea</h2>
      {pricePerKg !== null && (
        <div className="price-per-kg-section">
          <label htmlFor='Price per Kilogram'>Price per kilogram: </label>
          <span>{pricePerKg.toFixed(2)} EUR</span>
        </div>
      )}
      <form onSubmit={handleSubmit}>

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="weight">Package Weight (grams):</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          required
        />

        <label htmlFor="price">Package Price (EUR):</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />

        <label htmlFor="roastLevel">Roast Level:</label>
        <select
          id="roastLevel"
          value={roastLevel}
          onChange={(e) => setRoastLevel(Number(e.target.value))}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CoffeeTeaForm;