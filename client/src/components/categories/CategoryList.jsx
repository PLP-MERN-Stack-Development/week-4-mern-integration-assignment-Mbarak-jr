import React from 'react'

const CategoryList = ({ categories }) => {
  if (categories.length === 0) {
    return <p className="text-gray-600">No categories available.</p>
  }

  return (
    <ul className="space-y-2">
      {categories.map(category => (
        <li
          key={category._id}
          className="p-3 bg-white border rounded-md shadow-sm flex items-center justify-between"
        >
          <span>{category.name}</span>
          {/* You can add Edit/Delete buttons here */}
        </li>
      ))}
    </ul>
  )
}

export default CategoryList
