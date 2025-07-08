import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import LoginForm from '../../components/auth/LoginForm'

function Login() {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (credentials) => {
    setLoading(true)
    setError(null)
    try {
      await login(credentials)
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Welcome Back
            </h1>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-center">
              {error}
            </div>
          )}
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <LoginForm onSubmit={handleLogin} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login