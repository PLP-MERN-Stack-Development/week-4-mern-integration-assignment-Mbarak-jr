import React, { useState } from 'react';
import Button from '../common/Button';

const CategoryFilter = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Technology',
    'Art',
    'Health',
    'Business',
    'Education',
    'Travel'
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-600">
          Browse by Category
        </span>
      </h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleCategoryClick(category)}
            className={`transition-all duration-200 ${
              activeCategory === category
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'border-amber-400 text-amber-600 hover:bg-amber-50'
            }`}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;