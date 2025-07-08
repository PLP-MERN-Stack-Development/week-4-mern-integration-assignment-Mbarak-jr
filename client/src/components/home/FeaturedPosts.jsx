import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Card from '../common/Card';
import CategoryFilter from './CategoryFilter';
import { useNavigate } from 'react-router-dom';

const FeaturedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        const allPosts = res.data.posts || [];
        setPosts(allPosts);
        setFilteredPosts(allPosts);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const rotateRight = useCallback(() => {
    if (filteredPosts.length <= 3) return;
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % (filteredPosts.length - 2)
    );
  }, [filteredPosts.length]);

  const rotateLeft = useCallback(() => {
    if (filteredPosts.length <= 3) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredPosts.length - 3 : prevIndex - 1
    );
  }, [filteredPosts.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      rotateRight();
    }, 5000);
    return () => clearInterval(interval);
  }, [rotateRight]);

  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory === 'All') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) => post.category?.name === selectedCategory
      );
      setFilteredPosts(filtered);
    }
    setCurrentIndex(0); // Reset to first card when category changes
  };

  const getVisiblePosts = () => {
    if (filteredPosts.length <= 3) return filteredPosts;
    return [
      filteredPosts[currentIndex % filteredPosts.length],
      filteredPosts[(currentIndex + 1) % filteredPosts.length],
      filteredPosts[(currentIndex + 2) % filteredPosts.length]
    ];
  };

  const handleReadMore = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <section className="bg-gradient-to-b from-amber-50 to-white">
      <div className="w-full bg-gradient-to-r from-amber-100/30 via-white to-amber-100/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CategoryFilter onCategoryChange={handleCategoryChange} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-600">
            Featured Posts
          </span>
        </h2>

        {loading ? (
          <div className="flex justify-center py-8">
            <p className="text-amber-700">Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="flex justify-center py-8">
            <p className="text-amber-700">No posts found in this category.</p>
          </div>
        ) : (
          <div className="relative">
            {filteredPosts.length > 3 && (
              <>
                <button 
                  onClick={rotateLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-white p-2 rounded-full shadow-md hover:bg-amber-50 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={rotateRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-white p-2 rounded-full shadow-md hover:bg-amber-50 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500">
              {getVisiblePosts().map((post) => (
                <Card
                  key={post._id}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-100 overflow-hidden h-full flex flex-col bg-white/90 backdrop-blur-sm"
                >
                  <img
                    src={
                      post.featuredImage?.startsWith('http')
                        ? post.featuredImage
                        : `http://localhost:5000/uploads/${post.featuredImage}`
                    }
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 flex-grow flex flex-col">
                    <span className="text-sm font-semibold text-amber-600">
                      {post.category?.name || 'Uncategorized'}
                    </span>
                    <h3 className="text-xl font-bold mt-2 mb-3 text-gray-800 group-hover:text-amber-700">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {post.excerpt?.length > 120 
                        ? post.excerpt.slice(0, 120) + '...' 
                        : post.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-sm text-amber-700/80">
                      <span>{post.author?.username || 'Anonymous'}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <button
                      onClick={() => handleReadMore(post._id)}
                      className="mt-4 w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-md hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
                    >
                      Read More
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPosts;
