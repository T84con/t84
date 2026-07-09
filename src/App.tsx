import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Plane as Crane, Building2, Users, Phone, MapPin, Clock, Facebook, Instagram, Menu, X, Home, Settings, FolderOpen, Info } from 'lucide-react';
import heroBackground from './assets/images/hero/background.jpg';
import aboutImage from './assets/images/aboutImage/bg.jpg';
import { Helmet } from 'react-helmet';
import ProjectPage from './components/ProjectPage';
import emailjs from '@emailjs/browser';

// BN9 Project Images
import bn9Image1 from './assets/images/BN9/1.png';

const bn9GalleryImages = Object.entries(
  import.meta.glob('./assets/images/BN9/new/*.{jpg,jpeg,png}', { eager: true, import: 'default' })
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url as string);

const samutPrakanImages = Object.entries(
  import.meta.glob('./assets/images/SamutPrakan/*.png', { eager: true, import: 'default' })
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url as string);

type ProjectStatus = 'FINISHED' | 'IN_PROCESS';
type ProjectCategory = 'BUILD' | 'RENOVATE' | 'DESIGN';

interface Project {
  img: string;
  images: string[];
  title: string;
  location: string;
  year: string;
  description: string;
  status: ProjectStatus;
}

const projectCategories: Record<ProjectCategory, Project[]> = {
  BUILD: [
    {
      img: samutPrakanImages[0],
      images: samutPrakanImages,
      title: 'Residence Samut Prakan',
      location: 'Samut Prakan, Thailand',
      year: '2026',
      description: `
          Area : 650 sq.m
          Architects : TEM Architects
          Construction : T84 Construction
        `,
      status: 'IN_PROCESS'
    },
    {
      img: new URL('./assets/images/Laan/1.jpg', import.meta.url).href,
      images: [
        new URL('./assets/images/Laan/1.jpg', import.meta.url).href,
        new URL('./assets/images/Laan/2.jpg', import.meta.url).href,
        new URL('./assets/images/Laan/3.jpg', import.meta.url).href,
      ],
      title: 'Residence LaanLom',
      location: ' Bangkok, Thailand',
      year: '2025',
      description: `
          Area : 700 sq.m
          Architects : Puen-din Architects
          Construction : T84 Construction
        `,
      status: 'IN_PROCESS'
    },
    {
      img: new URL('./assets/images/rama9/1.jpg', import.meta.url).href,
      images: [
        new URL('./assets/images/rama9/1.jpg', import.meta.url).href,
      ],
      title: 'Residence SR11 Rama Nine',
      location: 'Bangkok, Thailand',
      year: '2025',
      description: `
          Area : 288 sq.m
          Architects : ONE AND A HALF CO.LTD
          Construction : T84 Construction
        `,
      status: 'IN_PROCESS'
    },
    {
      img: new URL('./assets/images/baan-khun-film/1.jpg', import.meta.url).href,
      images: [
        new URL('./assets/images/baan-khun-film/1.jpg', import.meta.url).href,
        new URL('./assets/images/baan-khun-film/2.jpg', import.meta.url).href,
        new URL('./assets/images/baan-khun-film/3.jpg', import.meta.url).href,
        new URL('./assets/images/baan-khun-film/4.jpg', import.meta.url).href,
        new URL('./assets/images/baan-khun-film/5.jpg', import.meta.url).href,
        new URL('./assets/images/baan-khun-film/6.jpg', import.meta.url).href,
      ],
      title: 'Residence Rangsit',
      location: 'Phathumthani, Thailand',
      year: '2025',
      description: `
          Area : 530 sq.m
          Architects : 4504 Architect studio
          Construction : T84 Construction
        `,
      status: 'IN_PROCESS'
    },
    {
      img: bn9Image1,
      images: [bn9Image1, ...bn9GalleryImages],
      title: 'Residence BN9',
      location: 'Bangkok, Thailand',
      year: '2025',
      description: `
          Area : 883 sq.m
          Architects : ONE AND A HALF ARCHITECT CO.LTD
          Construction : T84 Construction
        `,
      status: 'FINISHED'
    },
    {
      img: new URL('./assets/images/Croco/2.jpg', import.meta.url).href,
      images: [
        new URL('./assets/images/Croco/2.jpg', import.meta.url).href,
        new URL('./assets/images/Croco/3.jpg', import.meta.url).href,
        new URL('./assets/images/Croco/4.jpg', import.meta.url).href,
        new URL('./assets/images/Croco/5.jpg', import.meta.url).href,
        new URL('./assets/images/Croco/6.jpg', import.meta.url).href,
        new URL('./assets/images/Croco/7.jpg', import.meta.url).href,
        new URL('./assets/images/Croco/8.jpg', import.meta.url).href,
        new URL('./assets/images/Croco/9.jpg', import.meta.url).href,
        new URL('./assets/images/Croco/10.jpg', import.meta.url).href,
      ],
      title: 'Croco Office',
      location: 'Rama Nine, Thailand',
      year: '2025',
      description: `
          Area : 115 sq.m
          Owner : Croco International
          Architects : T84 Construction
          Construction : T84 Construction
        `,
      status: 'FINISHED'
    },
    {
      img: new URL('./assets/images/Pakchong/1.jpg', import.meta.url).href,
      images: [
        new URL('./assets/images/Pakchong/1.jpg', import.meta.url).href,
        new URL('./assets/images/Pakchong/2 (2).jpg', import.meta.url).href,
        new URL('./assets/images/Pakchong/2.jpg', import.meta.url).href,
        new URL('./assets/images/Pakchong/1 (4).jpg', import.meta.url).href,
        new URL('./assets/images/Pakchong/3 (2).jpg', import.meta.url).href,
        new URL('./assets/images/Pakchong/4 (2).jpg', import.meta.url).href,
        new URL('./assets/images/Pakchong/5 (2).jpg', import.meta.url).href,
        new URL('./assets/images/Pakchong/7 (2).jpg', import.meta.url).href,
        new URL('./assets/images/Pakchong/9 (2).jpg', import.meta.url).href,
      ],
      title: 'Residence Pakchong',
      location: 'Rama Nine, Thailand',
      year: '2025',
      description: `
          Area : 680 sq.m
          Architects : ขาล
          Construction : T84 Construction
        `,
      status: 'FINISHED'
    },
  ],
  RENOVATE: [
    {
      img: new URL('./assets/images/Ohm/1.jpg', import.meta.url).href,
      images: [
        new URL('./assets/images/Ohm/1.jpg', import.meta.url).href,
      ],
      title: 'Renovate Pattanakarn',
      location: 'Pattanakarn, Thailand',
      year: '2025',
      description: `
          Area : 192 sq.m
          Construction : T84 Construction
        `,
      status: 'FINISHED'
    },
    {
      img: new URL('./assets/images/Omakase/1.jpg', import.meta.url).href,
      images: [
        new URL('./assets/images/Omakase/1.jpg', import.meta.url).href,
      ],
      title: 'Renovate Omakase',
      location: 'Onnut, Thailand',
      year: '2025',
      description: `
          Area : 50 sq.m
          Architects : T84 Construction
          Construction: T84 Construction
        `,
      status: 'FINISHED'
    },
    {
      img: new URL('./assets/images/Auto/1.jpg', import.meta.url).href,
      images: [
        new URL('./assets/images/Auto/1.jpg', import.meta.url).href,
        new URL('./assets/images/Auto/2.jpg', import.meta.url).href,
        new URL('./assets/images/Auto/3.jpg', import.meta.url).href,
        new URL('./assets/images/Auto/4.jpg', import.meta.url).href,
        new URL('./assets/images/Auto/5.jpg', import.meta.url).href,
        new URL('./assets/images/Auto/6.jpg', import.meta.url).href,
      ],
      title: 'Renovate Autowerks Asia Rama4',
      location: 'Rama 4, Bangkok',
      year: '2022',
      description: `
          Area : 100 sq.m
          Owner : Autowroks Asia Bangkok
          Architects : T84 Construction
          Construction : T84 Construction
        `,
      status: 'FINISHED'
    },
  ],
  DESIGN: []
};

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('BUILD');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectSlideIndex, setProjectSlideIndex] = useState(0);
  const [projectsPerSlide, setProjectsPerSlide] = useState(3);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = ['home', 'services', 'projects', 'about', 'contact'] as const;

  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMessageSent(true);

    if (form.current) {
      const formElement = form.current;
      emailjs.sendForm(
        'service_kb2z4ar',
        'template_bysyot9',
        form.current,
        'rrXiMhXAGaSua329z'
      )
        .then(() => {
          formElement.reset();
          setTimeout(() => setIsMessageSent(false), 3000);
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
          setIsMessageSent(false);
          alert('Failed to send email. Please try again later.');
        });
    } else {
      setIsMessageSent(false);
    }
  };

  useEffect(() => {
    const sectionIds = ['services', 'projects', 'about', 'contact'];

    const updateScrollState = () => {
      setScrollY(window.scrollY);

      const scrollPosition = window.scrollY + 80;
      let current = 'home';

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element && scrollPosition >= element.offsetTop) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    const updatePerSlide = () => {
      const width = window.innerWidth;
      setProjectsPerSlide(width < 640 ? 1 : width < 1024 ? 2 : 3);
    };

    updatePerSlide();
    window.addEventListener('resize', updatePerSlide);
    return () => window.removeEventListener('resize', updatePerSlide);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveSection(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setIsTransitioning(true);
    setProjectSlideIndex(0);
    setActiveCategory(category as 'BUILD' | 'RENOVATE' | 'DESIGN');
    setTimeout(() => setIsTransitioning(false), 300); // Match this with the transition duration
  };

  const sortedProjects = useMemo(
    () =>
      [...projectCategories[activeCategory]].sort(
        (a, b) => (a.status === 'FINISHED' ? 1 : 0) - (b.status === 'FINISHED' ? 1 : 0)
      ),
    [activeCategory]
  );
  const totalProjectSlides = Math.max(1, Math.ceil(sortedProjects.length / projectsPerSlide));

  useEffect(() => {
    setProjectSlideIndex((prev) => Math.min(prev, totalProjectSlides - 1));
  }, [totalProjectSlides]);

  useEffect(() => {
    if (totalProjectSlides <= 1) return;

    const interval = setInterval(() => {
      setProjectSlideIndex((prev) => (prev + 1) % totalProjectSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeCategory, totalProjectSlides]);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>T84 Construction - Leading Construction Company in Bangkok, Thailand</title>
        <meta name="description" content="Since 1984, T84 Construction has been delivering exceptional building projects in Bangkok. Specializing in commercial, industrial, and residential construction." />
        <meta name="keywords" content="construction company, Bangkok construction, commercial construction, industrial projects, residential development, T84 Construction" />
        <meta property="og:title" content="T84 Construction - Leading Construction Company in Bangkok" />
        <meta property="og:description" content="Excellence in construction with innovative solutions and sustainable practices since 1984." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://t84construction.com" />
      </Helmet>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white z-[100] border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src={new URL('./assets/logo/t84.jpg', import.meta.url).href} alt="T84 Construction Logo" className="h-10 w-auto object-contain" />
              <span className="text-xl font-bold">T84 CONSTRUCTION</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors relative group py-1 ${
                    activeSection === item ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {item}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                      activeSection === item ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden fixed inset-0 top-16 z-40 ${
              isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            <div
              className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
                isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            <div
              className={`absolute top-0 left-0 h-full w-full max-w-sm bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className="p-6 pt-8 flex flex-col space-y-6">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize transition-colors text-lg py-2 flex items-center gap-3 border-l-4 pl-3 ${
                      activeSection === item
                        ? 'text-blue-600 border-blue-600 font-semibold'
                        : 'text-gray-600 hover:text-blue-600 border-transparent'
                    }`}
                  >
                    {item === 'home' && <Home className="h-5 w-5" />}
                    {item === 'services' && <Settings className="h-5 w-5" />}
                    {item === 'projects' && <FolderOpen className="h-5 w-5" />}
                    {item === 'about' && <Info className="h-5 w-5" />}
                    {item === 'contact' && <Phone className="h-5 w-5" />}
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 break-words">T84 CONSTRUCTION</h1>
            <p className="text-lg sm:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">The Beginning Of A Great Construction.</p>
            <button 
              onClick={() => scrollToSection('projects')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-widest uppercase text-sm">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">Our Services</h2>
            <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mt-5"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Building2 className="h-8 w-8" />, title: 'Construction', desc: 'State-of-the-art commercial buildings and facilities' },
              { icon: <Crane className="h-8 w-8" />, title: 'Renovate', desc: 'Large-scale industrial construction solutions' },
              { icon: <Users className="h-8 w-8" />, title: 'Design', desc: 'Custom homes and residential complexes' }
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50 text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold tracking-widest uppercase text-sm">Our Work</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">Featured Projects</h2>
            <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mt-5"></div>
          </div>
          
          {/* Category Selection */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
              {Object.keys(projectCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`relative px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${activeCategory === category ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Carousel */}
          {sortedProjects.length === 0 ? (
            <div className="text-center text-gray-500 py-16">
              <FolderOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Coming soon</p>
            </div>
          ) : (
          <div className={`relative transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${projectSlideIndex * 100}%)` }}
              >
                {Array.from({ length: totalProjectSlides }).map((_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="w-full flex-shrink-0 grid gap-6"
                    style={{ gridTemplateColumns: `repeat(${projectsPerSlide}, minmax(0, 1fr))` }}
                  >
                    {sortedProjects
                      .slice(slideIndex * projectsPerSlide, slideIndex * projectsPerSlide + projectsPerSlide)
                      .map((project) => (
                        <div
                          key={project.title}
                          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => {
                            setSelectedProject(project);
                            setIsModalOpen(true);
                          }}
                        >
                          <div className="aspect-video relative overflow-hidden">
                            <img
                              src={project.img}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <span
                              className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${project.status === 'FINISHED' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}`}
                            >
                              {project.status === 'FINISHED' ? 'Finished' : 'In Process'}
                            </span>
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                            <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {project.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {project.year}
                              </div>
                            </div>
                            <p className="text-gray-600 whitespace-pre-line">{project.description}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {totalProjectSlides > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalProjectSlides }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => setProjectSlideIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === projectSlideIndex ? 'w-8 bg-blue-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          )}
        </div>
      </section>

      {/* Project Details Page */}
      {isModalOpen && selectedProject && (
        <ProjectPage
          project={selectedProject}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* About Section */}
      <section id="about" className="py-24 bg-white scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative order-last md:order-first">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-blue-600 rounded-tl-2xl hidden sm:block"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-blue-600 rounded-br-2xl hidden sm:block"></div>
              <img
                src={aboutImage}
                alt="T84 Construction site"
                className="w-full h-[420px] object-cover rounded-2xl shadow-lg relative z-10"
              />
            </div>

            {/* Text */}
            <div>
              <span className="text-blue-600 font-semibold tracking-widest uppercase text-sm">Who We Are</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">About T84 Construction</h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                T84 Construction Co., Ltd. was established in 2015 with the objective of providing comprehensive construction services. The company specializes in building construction, infrastructure works, as well as renovation and interior decoration.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Over the past 10 years, we have accumulated extensive experience across a wide range of construction projects, guided by the core principles of “Quality Standards, On-Time Delivery, and Customer Satisfaction at Heart.”
              </p>
              <p className="text-gray-600 leading-relaxed">
                With a highly experienced and capable team, we are dedicated to delivering excellence in every project we undertake.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 relative z-[60] scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-bold mb-12">Contact Us</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Office Location</h3>
                  <p className="text-gray-600 leading-relaxed">
                    84 Soi On Nut 66, Intersection 19-7,<br />
                    Prawet Subdistrict, Prawet District,<br />
                    Bangkok 10250
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Email Us</h3>
                  <a 
                    href="mailto:t84con@gmail.com" 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    t84con@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Project Manager</h3>
                  <div className="flex flex-col space-y-1">
                    <a 
                      href="tel:0892265153" 
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      0892265153
                    </a>
                    <span className="text-gray-500">K. Beam</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Construction Manager</h3>
                  <div className="flex flex-col space-y-1">
                    <a 
                      href="tel:0938792555" 
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      0938792555
                    </a>
                    <span className="text-gray-500">K. Arm</span>
            </div>
            </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Client Relations</h3>
                  <div className="flex flex-col space-y-1">
                    <a 
                      href="tel:0949645532" 
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      0949645532
                    </a>
                    <span className="text-gray-500">K. Yok</span>
            </div>
          </div>

                {/* Map */}
                <div className="mt-12">
                  <iframe
                    title="T84 Construction Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d969.041945979473!2d100.65361482062622!3d13.70828588739029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d605d36d6f269%3A0x7f5827ddcecf8c1b!2s84%20On%20Nut%2066%20Alley%2C%20Lane%201%2C%20Khwaeng%20Prawet%2C%20Khet%20Prawet%2C%20Krung%20Thep%20Maha%20Nakhon%2010250!5e0!3m2!1sen!2sth!4v1745563107826!5m2!1sen!2sth"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg shadow-sm"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-10">
                <h3 className="text-2xl font-bold mb-8">Start Your Project</h3>
                {isMessageSent ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                    <strong className="font-bold">Success! </strong>
                    <span className="block sm:inline">Your message has been sent to t84con@gmail.com. We'll get back to you soon!</span>
                  </div>
                ) : null}
                <form ref={form} onSubmit={handleSubmit} className="space-y-6 relative z-[70]">
                  {/* Hidden field for recipient email */}
                  <input type="hidden" name="to_email" value="t84con@gmail.com" />
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                      id="name"
                      name="user_name"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                      aria-label="Your name"
                  />
                </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                      id="email"
                      name="user_email"
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                      aria-label="Your email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                      id="phone"
                      name="user_phone"
                      type="tel"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                      aria-label="Your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-700 mb-2">Project Details</label>
                <textarea
                      id="projectDetails"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none transition-all duration-200"
                      aria-label="Your project details"
                ></textarea>
                  </div>
                <button
                  type="submit"
                  disabled={isMessageSent}
                  className={`w-full px-8 py-4 rounded-lg font-semibold text-base transition-colors ${isMessageSent ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                  aria-label="Send message"
                >
                  {isMessageSent ? 'Message Sent' : 'Send Message'}
                </button>
              </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-white">T84 CONSTRUCTION</span>
              </div>
              <p className="text-sm">Building excellence through innovation and sustainable practices since 2023.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Services', 'Projects', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Commercial Construction</li>
                <li className="text-gray-400">Industrial Projects</li>
                <li className="text-gray-400">Residential Development</li>
                <li className="text-gray-400">Renovation Services</li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/profile.php?id=100063487839667&locale=th_TH" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/t84construction?igsh=MTE1cG55ZjB1ZmowMQ%3D%3D&utm_source=qr" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} T84 CONSTRUCTION. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
