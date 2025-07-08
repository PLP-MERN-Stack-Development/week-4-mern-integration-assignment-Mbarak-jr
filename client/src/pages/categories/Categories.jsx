import { useEffect, useState } from 'react'
import CategoryList from '../../components/categories/CategoryList'
import CategoryForm from '../../components/categories/CategoryForm'
import categoryService from '../../services/categoryService'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories()
      setCategories(data)
    } catch (err) {
      console.error(err)
      setError('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleAddCategory = async (newCategory) => {
    try {
      const created = await categoryService.createCategory(newCategory)
      setCategories(prev => [...prev, created])
    } catch (err) {
      console.error(err)
      alert('Failed to add category')
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Manage Categories</h1>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <CategoryForm onSubmit={handleAddCategory} />
          <CategoryList categories={categories} />
        </>
      )}
    </div>
  )
}

export default Categories
