import React from 'react';
import CoffeeTeaForm from './components/CoffeeTeaForm';
import CoffeeTeaList from './components/CoffeeTeaList';

const App: React.FC = () => {
  return (
    <div>
      <CoffeeTeaForm />
      <CoffeeTeaList />
    </div>
  );
};

export default App;