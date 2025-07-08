import React, { useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'

const CategoryForm = ({ onSubmit }) => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    try {
      await onSubmit({ name })
      setName('')
    } catch (err) {
      console.error('Error submitting category:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <Input
          type="text"
          name="name"
          placeholder="New category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-grow"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add'}
        </Button>
      </div>
    </form>
  )
}

export default CategoryForm 
