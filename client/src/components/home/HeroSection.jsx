import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Button from '../common/Button';

const HeroSection = () => {
  const [heroData, setHeroData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hero');
        const data = await response.json();
        setHeroData(data);
      } catch (err) {
        console.error('Failed to fetch hero data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  useEffect(() => {
    if (heroData.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === heroData.length - 1 ? 0 : prev + 1
        );
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [heroData]);

  if (loading) return <div className="h-96 bg-gray-200 animate-pulse"></div>;
  if (!heroData.length) return <div>No hero content available</div>;

  const currentHero = heroData[currentIndex];

  return (
    <div className="relative text-white">
      {/* Background gradient */}
      <div
        className={clsx(
          'absolute inset-0 z-0',
          `bg-gradient-to-br from-${currentHero.colorScheme.gradientFrom} via-${currentHero.colorScheme.gradientVia} to-${currentHero.colorScheme.gradientTo}`
        )}
      ></div>

      {/* Light blue overlay - clean and inviting */}
      <div className="absolute inset-0 bg-sky-300 bg-opacity-50 z-0"></div>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span
            className={clsx(
              'bg-clip-text text-transparent',
              `bg-gradient-to-r from-${currentHero.colorScheme.highlightFrom} to-${currentHero.colorScheme.highlightTo}`
            )}
          >
            {currentHero.highlightedText}
          </span>
          <br />
          {currentHero.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
          {currentHero.subtitle}
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.href = currentHero.secondaryButtonLink}
            className={clsx(
              'border-amber-500 text-amber-500',
              'hover:bg-amber-600 hover:text-black'
            )}
          >
            {currentHero.secondaryButtonText}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.href = currentHero.primaryButtonLink}
            className={clsx(
              'border-amber-500 text-amber-500',
              'hover:bg-amber-600 hover:text-black'
            )}
          >
            {currentHero.primaryButtonText}
          </Button>
        </div>
      </div>

      {/* Fade to white at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-0"></div>
    </div>
  );
};

export default HeroSection;
