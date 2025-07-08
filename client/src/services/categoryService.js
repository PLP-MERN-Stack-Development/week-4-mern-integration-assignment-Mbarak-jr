import api from '../utils/api'

const categoryService = {
  async getAllCategories() {
    const response = await api.get('/categories')
    return response.data
  },

  async getCategoryById(id) {
    const response = await api.get(`/categories/${id}`)
    return response.data
  },

  async createCategory(categoryData) {
    const response = await api.post('/categories', categoryData)
    return response.data
  },

  async updateCategory(id, categoryData) {
    const response = await api.put(`/categories/${id}`, categoryData)
    return response.data
  },

  async deleteCategory(id) {
    await api.delete(`/categories/${id}`)
  }
}

export default categoryService