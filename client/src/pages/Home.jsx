import HeroSection from '../components/home/HeroSection';
import FeaturedPosts from '../components/home/FeaturedPosts';

const Home = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedPosts />
    </div>
  );
};

export default Home;