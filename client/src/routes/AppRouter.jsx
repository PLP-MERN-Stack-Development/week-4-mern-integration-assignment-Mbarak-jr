// src/routes/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/Dashboard';
import Categories from '../pages/categories/Categories';
import ProtectedRoute from '../components/shared/ProtectedRoute';

// Lazy load post pages for better performance
const CreatePost = lazy(() => import('../pages/posts/CreatePost'));
const EditPost = lazy(() => import('../pages/posts/EditPost'));
const PostDetail = lazy(() => import('../pages/posts/PostDetail'));
const UserPosts = lazy(() => import('../pages/posts/UserPosts'));
const AllPostsPage = lazy(() => import('../pages/posts/AllPostsPage'));

export default function AppRouter() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="posts/:slug" element={<PostDetail />} />
          <Route path="posts" element={<AllPostsPage />} />

          {/* All protected routes are nested under ProtectedRoute */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/posts" element={<UserPosts />} />
            <Route path="posts/create" element={<CreatePost />} />
            <Route path="posts/:id/edit" element={<EditPost />} />
            <Route path="categories" element={<Categories />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}