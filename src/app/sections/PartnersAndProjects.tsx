"use client";

const EthereumFoundationLogo = "/assets/EthereumFoundationLogo.svg";
const GitcoinPassportLogo = "/assets/GitcoinPassportLogo.svg";
const ClaveLogo = "/assets/ClaveLogo.svg";
const IYKLogo = "/assets/IYKLogo.svg";
const ZKP2PLogo = "/assets/ZKP2PLogo.svg";
const OpenPassportLogo = "/assets/OpenPassportLogo.svg";
const ENSLogo = "/assets/ENS.svg";
const JupiterLogo = "/assets/Jupiter.svg";
const OpenZeppelinLogo = "/assets/OpenZeppelin.svg";
const RhinestoneLogo = "/assets/Rhinestone.svg";
const OKXLogo = "/assets/OKX.svg";
const EdgeCityLogo = "/assets/Edgecity.svg";
import { useState, useEffect, useRef } from "react";
import ProjectCard from "../components/ProjectCard";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "../contants";
import { useAnimateIn } from "../hooks/useAnimateIn";

// Define logo groups for carousel
const logoGroups = [
  [
    { src: EthereumFoundationLogo, alt: "Ethereum Foundation Logo", width: 150, height: 36 },
    { src: GitcoinPassportLogo, alt: "Gitcoin Passport Logo", width: 150, height: 36 },
    { src: RhinestoneLogo, alt: "Rhinestone Logo", width: 150, height: 36 }
  ],
  [
    { src: IYKLogo, alt: "IYK Logo", width: 100, height: 36 },
    { src: OKXLogo, alt: "OKX Logo", width: 150, height: 36 },
    { src: JupiterLogo, alt: "Jupiter Logo", width: 150, height: 36 }
  ],
  [
    { src: GitcoinPassportLogo, alt: "Gitcoin Passport Logo", width: 150, height: 36 },
    { src: OpenZeppelinLogo, alt: "OpenZeppelin Logo", width: 150, height: 36 },
    { src: EdgeCityLogo, alt: "EdgeCity Logo", width: 150, height: 36 }
  ],
  [
    { src: RhinestoneLogo, alt: "Rhinestone Logo", width: 150, height: 36 },
    { src: ENSLogo, alt: "ENS Logo", width: 150, height: 36 },
    { src: OpenPassportLogo, alt: "Open Passport Logo", width: 150, height: 36 }
  ],
  [
    { src: ClaveLogo, alt: "Clave Logo", width: 150, height: 36 },
    { src: EthereumFoundationLogo, alt: "Ethereum Foundation Logo", width: 150, height: 36 },
    { src: ZKP2PLogo, alt: "ZKP2P Logo", width: 150, height: 36 }
  ]
];

// Flatten all logos for mobile grid view
const allLogos = logoGroups.flat();

interface LogoItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface Project {
  title: string;
  description: string;
  imgSrc: string;
  link: string;
}

interface LogoCarouselItemProps {
  logos: LogoItem[];
  activeIndex: number;
  groupIndex: number;
}

const LogoCarouselItem = ({ logos, activeIndex, groupIndex }: LogoCarouselItemProps) => {
  return (
    <div className="logo-carousel-item h-[60px] relative">
      {logos.map((logo, idx) => {
        const isActive = idx === activeIndex;
        const isNext = (idx === (activeIndex + 1) % logos.length);
        const isPrev = (idx === (activeIndex - 1 + logos.length) % logos.length);
        
        return (
          <div 
            key={idx} 
            className="logo-carousel-slide flex items-center justify-center h-[60px] absolute top-0 left-0 w-full"
            style={{
              opacity: isActive ? 1 : 0,
              transform: `translateY(${
                isActive ? '0' : 
                isNext ? '100%' : 
                isPrev ? '-120%' : 
                idx < activeIndex ? '-100%' : '100%'
              })`,
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: isActive ? 2 : 1,
              willChange: 'transform, opacity'
            }}
          >
            <Image 
              src={logo.src} 
              alt={logo.alt} 
              width={logo.width} 
              height={logo.height}
              style={{ 
                objectFit: 'contain',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isActive ? 'scale(1)' : 'scale(0.5)',
                opacity: isActive ? 1 : 0,
                filter: isActive ? 'blur(0px)' : 'blur(26px)'
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

// Mobile Logo Carousel component
const MobileLogoCarousel = ({ logos }: { logos: LogoItem[] }) => {
  // Create groups of 6 logos (2 rows of 3)
  const logoGroups = Array.from({ length: Math.ceil(logos.length / 6) }, (_, i) =>
    logos.slice(i * 6, (i + 1) * 6)
  );
  
  // Track active indices for each column of logos
  const [activeIndices, setActiveIndices] = useState(Array(3).fill(0));
  const intervalRef = useRef<number | null>(null);
  const timeoutRefs = useRef<number[]>([]);
  
  // Set up animation intervals with staggered timing
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutRefs.current.forEach(timeout => {
      if (timeout) clearTimeout(timeout);
    });
    
    timeoutRefs.current = [];
    
    intervalRef.current = window.setInterval(() => {
      timeoutRefs.current.forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
      timeoutRefs.current = [];
      
      // Stagger the animation for each column
      for (let i = 0; i < 3; i++) {
        const timeoutId = window.setTimeout(() => {
          setActiveIndices(prev => {
            const newIndices = [...prev];
            newIndices[i] = (newIndices[i] + 1) % logoGroups.length;
            return newIndices;
          });
        }, i * 200);
        
        timeoutRefs.current.push(timeoutId);
      }
    }, 2500);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      timeoutRefs.current.forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, [logoGroups.length]);
  
  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Create three columns */}
      {[0, 1, 2].map(colIndex => (
        <div key={colIndex} className="relative h-[140px]">
          {logoGroups.map((group, groupIndex) => {
            // Get the logo for this position if it exists
            const logoIndex = colIndex + groupIndex * 3;
            const logo = logoIndex < logos.length ? logos[logoIndex] : null;
            
            if (!logo) return null;
            
            const isActive = activeIndices[colIndex] === groupIndex;
            const isNext = (activeIndices[colIndex] + 1) % logoGroups.length === groupIndex;
            const isPrev = (activeIndices[colIndex] - 1 + logoGroups.length) % logoGroups.length === groupIndex;
            
            return (
              <div 
                key={`${colIndex}-${groupIndex}`}
                className="absolute top-0 left-0 w-full border border-[#272727] rounded-md flex items-center justify-center p-2 h-[64px]"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: `translateY(${
                    isActive ? '0' : 
                    isNext ? '100%' : 
                    isPrev ? '-100%' : 
                    groupIndex < activeIndices[colIndex] ? '-100%' : '100%'
                  })`,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  zIndex: isActive ? 2 : 1,
                  willChange: 'transform, opacity'
                }}
              >
                <Image 
                  src={logo.src} 
                  alt={logo.alt} 
                  width={logo.width * 0.7} 
                  height={logo.height * 0.7}
                  style={{ 
                    objectFit: 'contain',
                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isActive ? 'scale(1)' : 'scale(0.5)',
                    opacity: isActive ? 1 : 0,
                    filter: isActive ? 'blur(0px)' : 'blur(10px)'
                  }}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Mobile card for horizontal scroll
const MobileProjectCard = ({ 
  project, 
  index, 
  hoveredCardIdx, 
  setHoveredCardIdx, 
  ...props 
}: { 
  project: Project; 
  index: number; 
  hoveredCardIdx: number | null; 
  setHoveredCardIdx: React.Dispatch<React.SetStateAction<number | null>>; 
  [key: string]: any;
}) => {
  return (
    <div 
      className="snap-center min-w-[85vw] mx-2 first:ml-4 last:mr-4 bg-[#161819] border border-[#272727] rounded-lg overflow-hidden"
      {...props}
    >
      <div className="relative">
        <Image
          src={project.imgSrc}
          alt={`${project.title}-image`}
          width={400}
          height={220}
          className="w-full h-[180px] object-cover"
        />
        {/* Corner pins */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#2962A5]"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#2962A5]"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#2962A5]"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#2962A5]"></div>
      </div>
      <div className="p-4 text-left">
        <h3 className="h5 font-bold mb-1">{project.title}</h3>
        <p className="subtitle2 text-[#D4D4D4]">{project.description}</p>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-[#2962A5]">
          Visit Project →
        </a>
      </div>
    </div>
  );
};

const PartnersAndProjects = () => {
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [partnersStyles, partnersRef] = useAnimateIn(undefined, { delay: 0 });
  const [projectStyles, projectRef] = useAnimateIn(undefined, { delay: 100 });
  const [activeIndex0, setActiveIndex0] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [activeIndex2, setActiveIndex2] = useState(0);
  const [activeIndex3, setActiveIndex3] = useState(0);
  const [activeIndex4, setActiveIndex4] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const mobileProjectsRef = useRef<HTMLDivElement>(null);
  const activeIndices = [activeIndex0, activeIndex1, activeIndex2, activeIndex3, activeIndex4];
  const setActiveIndices = [setActiveIndex0, setActiveIndex1, setActiveIndex2, setActiveIndex3, setActiveIndex4];
  
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const intervalRef = useRef<number | null>(null);
  const timeoutRefs = useRef<number[]>([]);
  const isMobile = windowWidth <= 768;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine how many logo groups to show based on window width
  const getVisibleLogoGroups = () => {
    if (windowWidth <= 480) return 2;
    if (windowWidth <= 768) return 3;
    return 5;
  };

  const visibleLogoGroups = logoGroups.slice(0, getVisibleLogoGroups());

  // Clean up existing timeouts and intervals
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      timeoutRefs.current.forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  // Set up a single interval to trigger all logo changes with staggered timeouts
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutRefs.current.forEach(timeout => {
      if (timeout) clearTimeout(timeout);
    });
    
    timeoutRefs.current = [];
    
    intervalRef.current = window.setInterval(() => {
      timeoutRefs.current.forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
      timeoutRefs.current = [];
      
      for (let i = 0; i < visibleLogoGroups.length; i++) {
        const timeoutId = window.setTimeout(() => {
          const setActiveIndex = setActiveIndices[i];
          const currentLogos = logoGroups[i];
          
          setActiveIndex(prevIndex => (prevIndex + 1) % currentLogos.length);
        }, i * 200); // Increased stagger timing for smoother effect
        
        timeoutRefs.current.push(timeoutId);
      }
    }, 2000); // Increased main interval
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      timeoutRefs.current.forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, [visibleLogoGroups.length]);

  // Handler for mobile project navigation
  const handleProjectDotClick = (index: number) => {
    if (mobileProjectsRef.current) {
      setActiveProjectIndex(index);
      const scrollAmount = index * (windowWidth * 0.85 + 16); // width of card + margin
      mobileProjectsRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll events to update active dot
  const handleProjectScroll = () => {
    if (mobileProjectsRef.current) {
      const scrollPosition = mobileProjectsRef.current.scrollLeft;
      const cardWidth = windowWidth * 0.85 + 16; // width of card + margin
      const newActiveIndex = Math.round(scrollPosition / cardWidth);
      setActiveProjectIndex(newActiveIndex);
    }
  };

  return (
    <section>
      {/* Partners section */}
      <div
        className="container-width container-padding"
        style={{ ...partnersStyles, textAlign: "center" }}
        ref={partnersRef}
      >
        <p className="h3">Trusted by the best</p>
        <p className="subtitle1 mb-8">
          From next-gen enterprises to established organizations
        </p>
        
        {/* Desktop view for partners */}
        <div className={`${isMobile ? 'hidden' : 'block'}`}>
          <div className="partner-logos mt-8">
            {visibleLogoGroups.map((logos, groupIndex) => (
              <LogoCarouselItem 
                key={groupIndex} 
                logos={logos} 
                activeIndex={activeIndices[groupIndex]}
                groupIndex={groupIndex}
              />
            ))}
          </div>
        </div>
        
        {/* Mobile view for partners - new animated carousel */}
        <div className={`${isMobile ? 'block' : 'hidden'} mt-8`}>
          <MobileLogoCarousel logos={allLogos} />
        </div>
      </div>
      
      {/* Projects section */}
      <div
        className="container-width container-padding"
        style={{ ...projectStyles, textAlign: "center", paddingTop: "2rem" }}
        ref={projectRef}
      >
        <p className="h3">ZK Email in Action</p>
        <div className="project-cards-container">
          {PROJECTS.slice(0, 3).map((project, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [cardStyles, cardRef] = useAnimateIn(undefined, {
              delay: 100 + index * 100,
            });

            return (
              <ProjectCard
                {...project}
                style={cardStyles}
                key={project.title}
                index={index}
                hoveredCardIdx={hoveredCardIdx}
                setHoveredCardIdx={setHoveredCardIdx}
              />
            );
          })}
        </div>

        <Link href={"/projects"}>
          <p
            className="subtitle1 lg:text-right text-[##A8A8A8] text-center hover:text-white transition-colors"
            style={{
              marginTop: 24,
            }}
          >
            Explore all projects
            <span style={{ marginLeft: 8 }}>→</span>
          </p>
        </Link>
      </div>
      
      {/* Add keyframes for fadeIn animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default PartnersAndProjects;
