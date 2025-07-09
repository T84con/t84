import React, { useEffect, useState } from 'react';
import { Plane as Crane, Building2, Users, Phone, HardHat, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, Menu, X, Home, Settings, FolderOpen, Info } from 'lucide-react';
import heroBackground from './assets/images/hero/background.jpg';
import { Helmet } from 'react-helmet';
import ProjectPage from './components/ProjectPage';

// BN9 Project Images
import bn9Image1 from './assets/images/BN9/1.png';
import bn9Image2 from './assets/images/BN9/2.jpg';
import bn9Image3 from './assets/images/BN9/3.jpg';
import bn9Image5 from './assets/images/BN9/5.jpg';
import bn9Image6 from './assets/images/BN9/6.jpg';
import bn9Image7 from './assets/images/BN9/7.jpg';
import bn9Image8 from './assets/images/BN9/8.jpg';
import bn9Image9 from './assets/images/BN9/9.jpg';
import bn9Image10 from './assets/images/BN9/10.jpg';
import bn9Image11 from './assets/images/BN9/11.jpg';
import bn9Image12 from './assets/images/BN9/12.jpg';
import bn9Image13 from './assets/images/BN9/13.jpg';
import bn9Image14 from './assets/images/BN9/14.jpg';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectDetails: ''
  });
  const [activeCategory, setActiveCategory] = useState<'BUILD' | 'RENOVATE' | 'DESIGN'>('BUILD');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [selectedProject, setSelectedProject] = useState<null | typeof projectCategories[keyof typeof projectCategories][0]>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setIsTransitioning(true);
    setActiveCategory(category as 'BUILD' | 'RENOVATE' | 'DESIGN');
    setTimeout(() => setIsTransitioning(false), 300); // Match this with the transition duration
  };

  const projectCategories = {
    BUILD: [
      { 
        img: 'src/assets/images/baan-khun-film/1.jpg',
        images: [
          'src/assets/images/baan-khun-film/1.jpg',
          'src/assets/images/baan-khun-film/2.jpg',
          'src/assets/images/baan-khun-film/3.jpg',
          'src/assets/images/baan-khun-film/4.jpg',
          'src/assets/images/baan-khun-film/5.jpg',
          'src/assets/images/baan-khun-film/6.jpg',
        ],
        title: 'Baan Khun Film',
        location: 'Phathumthani, Thailand',
        year: '2025',
        description: 'Area : 530 sq.m,Owner : Khun Film,Design  : 4504 Architect studio,Struction : T84 Construction.',
        status: 'IN_PROCESS'
      },
      { 
        img: bn9Image1,
        images: [
          bn9Image1,
          bn9Image2,
          bn9Image3,
          bn9Image5,
          bn9Image6,
          bn9Image7,
          bn9Image8,
          bn9Image9,
          bn9Image10,
          bn9Image11,
          bn9Image12,
          bn9Image13,
          bn9Image14,
        ],
        title: 'BN9',
        location: 'Bangkok, Thailand',
        year: '2025',
        description: 'Area : 883 sq.m,Owner : Khun Tong,Design  : ONE AND A HALF ARCHITECT CO.LTD,Struction : T84 Construction.',
        status: 'IN_PROCESS'
      },
      { 
        img: 'src/assets/images/Ladkrabang/1.jpg',
        images: [
          'src/assets/images/Ladkrabang/1.jpg',
         'src/assets/images/Ladkrabang/2.jpg',
         'src/assets/images/Ladkrabang/3.jpg',
         'src/assets/images/Ladkrabang/4.jpg',
         'src/assets/images/Ladkrabang/5.jpg',
         'src/assets/images/Ladkrabang/6.jpg',
        'src/assets/images/Ladkrabang/7.jpg',
        'src/assets/images/Ladkrabang/8.jpg',
        'src/assets/images/Ladkrabang/9.jpg',
        'src/assets/images/Ladkrabang/10.jpg',
        'src/assets/images/Ladkrabang/11.jpg',
        'src/assets/images/Ladkrabang/12.jpg',
        'src/assets/images/Ladkrabang/13.jpg',
        ],
        title: 'Project Ladkrabang',
        location: 'Ladkrabang, Thailand',
        year: '2025',
        description: 'Area : 1080 sq.m,Owner : Khun Fiare,Struction : T84 Construction.',
        status: 'IN_PROCESS'
      },
      { 
        img: 'src/assets/images/Croco/2.jpg',
        images: ['src/assets/images/Croco/2.jpg',
        'src/assets/images/Croco/3.jpg',
        'src/assets/images/Croco/4.jpg',
        'src/assets/images/Croco/5.jpg',
        'src/assets/images/Croco/6.jpg',
        'src/assets/images/Croco/7.jpg',
        'src/assets/images/Croco/8.jpg',
        'src/assets/images/Croco/9.jpg',
        'src/assets/images/Croco/10.jpg',
        ],
        title: 'Croco Office',
        location: 'Rama Nine, Thailand',
        year: '2025',
        description: 'Area : 115 sq.m,Owner : Croco International,Design  : T84 Construction,Struction : T84 Construction.',
        status: 'IN_PROCESS'
      },
      { 
        img: 'src/assets/images/rama9/1.jpg',
        images: [
          'src/assets/images/rama9/1.jpg',
        ],
        title: 'Rama Nine',
        location: 'Rama Nine, Thailand',
        year: '2025',
        description: 'Area : 288 sq.m,Owner : Khun Preaw,Design  : ONE AND A HALF CO.LTD,Struction : T84 Construction.',
        status: 'IN_PROCESS'
      },
      { 
        img: 'src/assets/images/Pakchong/1.jpg',
        images: [
          'src/assets/images/Pakchong/1.jpg',
          'src/assets/images/Pakchong/2 (2).jpg',
        'src/assets/images/Pakchong/2.jpg',
        'src/assets/images/Pakchong/1 (4).jpg',
        'src/assets/images/Pakchong/3 (2).jpg',
        'src/assets/images/Pakchong/4 (2).jpg',
        'src/assets/images/Pakchong/5 (2).jpg',
        'src/assets/images/Pakchong/7 (2).jpg',
        'src/assets/images/Pakchong/9 (2).jpg',
        ],
        title: 'Pakchong',
        location: 'Rama Nine, Thailand',
        year: '2025',
        description: 'Area : 680 sq.m,Owner : Khun Nok,Design  : ขาล,Struction : T84 Construction.',
        status: 'FINISHED'
      },
    ],
    RENOVATE: [
      { 
        img: 'src/assets/images/Ohm/1.jpg',
        images: [
          'src/assets/images/Ohm/1.jpg',
        ],
        title: 'Pattanakarn',
        location: 'Pattanakarn, Thailand',
        year: '2025',
        description: 'Area : 192 sq.m,Owner : Khun Ohm,Struction : T84 Construction.',
        status: 'FINISHED'
      },
      { 
        img: 'src/assets/images/Omakase/1.jpg',
        images: [
          'src/assets/images/Omakase/1.jpg',
        ],
        title: 'Omakase',
        location: 'Onnut, Thailand',
        year: '2025',
        description: 'Area : 50 sq.m,Owner : Khun Ponzu,Design  : T84 Construction,Struction : T84 Construction.',
        status: 'FINISHED'
      },
      { 
        img: 'src/assets/images/Auto/1.jpg',
        images: [
          'src/assets/images/Auto/1.jpg',
         'src/assets/images/Auto/2.jpg',
         'src/assets/images/Auto/3.jpg',
         'src/assets/images/Auto/4.jpg',
         'src/assets/images/Auto/5.jpg',
         'src/assets/images/Auto/6.jpg',
        ],
        title: 'Autoworks',
        location: 'Rama 4, Bangkok',
        year: '2022',
        description: 'Area : 100 sq.m,Owner : Autowroks Asia Bangkok,Design  : T84 Construction,Struction : T84 Construction.',
        status: 'FINISHED'
      },
    ],
    DESIGN: [
     
    ]
  };

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
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src="/src/assets/logo/t84.jpg" alt="T84 Construction Logo" className="h-10 w-auto object-contain" />
              <span className="text-xl font-bold">T84 CONSTRUCTION</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'services', 'projects', 'about', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-gray-600 hover:text-blue-600 capitalize transition-colors relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
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
            className={`md:hidden fixed inset-0 bg-white/80 backdrop-blur-sm transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="h-full w-full max-w-sm bg-white shadow-lg p-6 pt-20">
              <div className="flex flex-col space-y-6">
                {['home', 'services', 'projects', 'about', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="text-gray-600 hover:text-blue-600 capitalize transition-colors text-lg py-2 flex items-center gap-3"
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
            <h1 className="text-6xl font-bold mb-6">T84 CONSTRUCTION</h1>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">The Beginning Of A Great Construction.</p>
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
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Building2 className="h-8 w-8" />, title: 'Construction', desc: 'State-of-the-art commercial buildings and facilities' },
              { icon: <Crane className="h-8 w-8" />, title: 'Renovate', desc: 'Large-scale industrial construction solutions' },
              { icon: <Users className="h-8 w-8" />, title: 'Design', desc: 'Custom homes and residential complexes' }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-blue-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          
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

          {/* Projects Grid */}
          <div className="relative">
            <div className="overflow-x-auto pb-8 -mx-4 px-4 hide-scrollbar">
              <div 
                className={`flex gap-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
                style={{ minWidth: 'max-content' }}
              >
                {projectCategories[activeCategory].map((project, index) => (
                  <div 
                    key={index}
                    className="w-[300px] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
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
                      <p className="text-gray-600 line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About T84 Construction</h2>
            <p className="text-gray-600 mb-6">
            T84 Construction Co., Ltd. was established in 2015 with the objective of providing comprehensive construction services. The company specializes in building construction, infrastructure works, as well as renovation and interior decoration.
              </p>
              <p className="text-gray-600 mb-8">
Over the past 10 years, the company has accumulated extensive experience and expertise across a wide range of construction projects. We are committed to upholding professional management standards to meet the diverse needs of our clients, guided by the core principles of “Quality Standards, On-Time Delivery, and Customer Satisfaction at Heart.”
              </p>
              <p className="text-gray-600 mb-8">
              With a highly experienced and capable team, we are dedicated to delivering excellence in every project we undertake.              </p>
    
            </div>
            <div className="relative">
            
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                      id="name"
                      name="name"
                    type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                      aria-label="Your name"
                  />
                </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                      id="email"
                      name="email"
                  type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                      aria-label="Your email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                      id="phone"
                      name="phone"
                  type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                      aria-label="Your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-700 mb-2">Project Details</label>
                <textarea
                      id="projectDetails"
                      name="projectDetails"
                      rows={5}
                      required
                      value={formData.projectDetails}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none transition-all duration-200"
                      aria-label="Your project details"
                ></textarea>
                  </div>
                <button
                  type="submit"
                    className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-base"
                    aria-label="Send message"
                >
                  Send Message
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
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
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
