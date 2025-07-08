import { useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import { useNavigate } from 'react-router-dom'

function RegisterForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
    setSubmitError('')
  }

  const validate = () => {
    const newErrors = {}
    let isValid = true

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
      isValid = false
    }

    if (!formData.email.match(/.+@.+\..+/)) {
      newErrors.email = 'Invalid email format'
      isValid = false
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      isValid = false
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validate()) {
      try {
        await onSubmit({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
        setRegistrationSuccess(true)
        setSubmitError('')
      } catch (error) {
        setSubmitError(
          error?.response?.data?.message || 'Registration failed. Please try again.'
        )
      }
    }
  }

  const closePrompt = () => {
    setRegistrationSuccess(false)
  }

  const goToLogin = () => {
    navigate('/login')
  }

  const goToHome = () => {
    navigate('/')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          required
        />
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
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />

        {submitError && (
          <div className="text-sm text-red-600">{submitError}</div>
        )}

        <Button 
          type="submit" 
          className="w-full mt-6" 
          disabled={loading}
          variant="primary"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </Button>
      </form>

      {/* Success Prompt */}
      {registrationSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button 
              onClick={closePrompt}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-3">Registration Successful!</h3>
              <p className="text-sm text-gray-500 mt-2">
                Your account has been created successfully. You can now proceed to login or return to the home page.
              </p>
              
              <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={goToLogin}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
                >
                  Proceed to Login
                </Button>
                <Button
                  onClick={goToHome}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RegisterForm
