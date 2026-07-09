import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, Clock, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectPageProps {
  project: {
    img: string;
    images?: string[];
    title: string;
    location: string;
    year: string;
    description: string;
    status: 'FINISHED' | 'IN_PROCESS';
  };
  onClose: () => void;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageOrientations, setImageOrientations] = useState<Record<number, 'portrait' | 'landscape'>>({});
  const images = useMemo(() => project.images || [project.img], [project.images, project.img]);
  const isPortrait = imageOrientations[currentImageIndex] === 'portrait';

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    setCurrentImageIndex(0);
    setImageOrientations({});

    images.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        setImageOrientations((prev) => ({
          ...prev,
          [index]: img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape',
        }));
      };
      img.src = src;
    });
  }, [images]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageLoad = (index: number, event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setImageOrientations((prev) => ({
      ...prev,
      [index]: naturalHeight > naturalWidth ? 'portrait' : 'landscape',
    }));
  };

  return (
    <div className="fixed inset-0 bg-white z-[120] overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Projects
        </button>

        {/* Project Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">{project.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">{project.year}</span>
            </div>
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${project.status === 'FINISHED' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}`}
            >
              {project.status === 'FINISHED' ? 'Finished' : 'In Process'}
            </span>
          </div>
        </div>

        {/* Project Image Slider */}
        <div
          className={`relative w-full overflow-hidden rounded-xl mb-12 group bg-gray-100 transition-all duration-500 ${
            isPortrait ? 'aspect-[3/4] max-w-md mx-auto' : 'aspect-video'
          }`}
        >
          <img
            src={images[currentImageIndex]}
            alt={`${project.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-contain transition-transform duration-500"
            onLoad={(event) => handleImageLoad(currentImageIndex, event)}
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          
          {/* Pagination Indicators */}
          {images.length > 1 && images.length <= 8 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to image ${index + 1}`}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white w-4' : 'bg-white/60'}`}
                />
              ))}
            </div>
          )}
          {images.length > 8 && (
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Project Description */}
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
          <p className="text-gray-600 leading-relaxed mb-8">{project.description}</p>

          {/* Additional Project Details */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Project Specifications</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Location: {project.location}</li>
                <li>Year: {project.year}</li>
                <li>Status: {project.status === 'FINISHED' ? 'Completed' : 'In Progress'}</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Modern Design</li>
                <li>Sustainable Materials</li>
                <li>Energy Efficient</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;