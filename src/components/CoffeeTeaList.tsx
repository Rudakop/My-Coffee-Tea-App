import React, { useState, useEffect } from 'react';
import './CoffeeTeaList.scss';

interface CoffeeTeaItem {
  name: string;
  weight: number;
  price: number;
  roastLevel: number;
}

const CoffeeTeaList: React.FC = () => {
  const [coffeeTeaList, setCoffeeTeaList] = useState<CoffeeTeaItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/coffeeTeaList')
      .then((response) => response.json())
      .then((data) => {
        setCoffeeTeaList(data as CoffeeTeaItem[]);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="coffee-tea-list">
      <h2>Saved Coffee and Tea</h2>
      <ul>
        {coffeeTeaList.map((item, index) => (
          <li key={index}>
            <strong>Name:</strong> {item.name},{' '}
            <strong>Weight:</strong> {item.weight} grams,{' '}
            <strong>Price:</strong> {item.price} EUR,{' '}
            <strong>Roast Level:</strong> {item.roastLevel},{' '}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoffeeTeaList;