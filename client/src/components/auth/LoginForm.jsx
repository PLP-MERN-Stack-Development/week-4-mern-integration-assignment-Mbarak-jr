import { useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import LoadingSpinner from '../shared/LoadingSpinner'
import { useNavigate } from 'react-router-dom'

function LoginForm({ onSubmit, loading: propLoading }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    let isValid = true

    if (!formData.email.match(/.+@.+\..+/)) {
      newErrors.email = 'Invalid email format'
      isValid = false
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validate()) {
      setIsLoggingIn(true)
      try {
        await onSubmit(formData)
        // Show spinner for at least 1 second (for better UX)
        await new Promise(resolve => setTimeout(resolve, 1000))
        navigate('/dashboard')
      } catch (error) {
        console.error('Login error:', error)
      } finally {
        setIsLoggingIn(false)
      }
    }
  }

  if (isLoggingIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <LoadingSpinner variant="ring" />
        <p className="mt-4 text-amber-600">Authenticating your credentials...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        minLength={6}
        required
      />
      <Button 
        type="submit" 
        className="w-full mt-6" 
        disabled={propLoading || isLoggingIn}
        variant="primary"
      >
        {propLoading || isLoggingIn ? 'Logging in...' : 'Sign In'}
      </Button>
    </form>
  )
}

export default LoginForm