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

const partnersLogos = [
  { src: EthereumFoundationLogo, alt: "Ethereum Foundation Logo", width: 150, height: 36, href: "https://ethereum.org/" },
  { src: GitcoinPassportLogo, alt: "Gitcoin Passport Logo", width: 150, height: 36, href: "https://passport.gitcoin.co/" },
  { src: RhinestoneLogo, alt: "Rhinestone Logo", width: 150, height: 36, href: "https://www.rhinestone.wtf/" },
  { src: IYKLogo, alt: "IYK Logo", width: 100, height: 36, href: "https://iyk.app/" },
  { src: OKXLogo, alt: "OKX Logo", width: 150, height: 36, href: "https://okx.com/" },
  { src: JupiterLogo, alt: "Jupiter Logo", width: 150, height: 36, href: "https://jup.ag/" },
  { src: OpenZeppelinLogo, alt: "OpenZeppelin Logo", width: 150, height: 36, href: "https://www.openzeppelin.com/" },
  { src: EdgeCityLogo, alt: "EdgeCity Logo", width: 150, height: 36, href: "https://www.edgecity.live/" },
  { src: ENSLogo, alt: "ENS Logo", width: 150, height: 36, href: "https://ens.domains/" },
  { src: OpenPassportLogo, alt: "Open Passport Logo", width: 150, height: 36, href: "https://self.xyz/" },
  { src: ClaveLogo, alt: "Clave Logo", width: 150, height: 36, href: "https://www.getclave.io/" },
  { src: ZKP2PLogo, alt: "ZKP2P Logo", width: 150, height: 36, href: "https://zkp2p.xyz/" }
];

const PartnersAndProjects = () => {
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);
  const [showAllPartners, setShowAllPartners] = useState(false);
  const [partnersStyles, partnersRef] = useAnimateIn(undefined, { delay: 0 });
  const [projectStyles, projectRef] = useAnimateIn(undefined, { delay: 100 });

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
        
        {/* Logos */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-16 items-center justify-items-center mt-12 mb-24">
          {partnersLogos.map((logo, index) => (
            <Link
              key={logo.alt}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className={index >= 6 && !showAllPartners ? "hidden md:block" : "block"}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className={`object-contain cursor-pointer transition-all duration-300 ease-in-out ${
                  hoveredPartner
                    ? hoveredPartner === logo.alt
                      ? "scale-110"
                      : "blur-sm opacity-50"
                    : ""
                }`}
                onMouseEnter={() => setHoveredPartner(logo.alt)}
                onMouseLeave={() => setHoveredPartner(null)}
              />
            </Link>
          ))}
        </div>
        {partnersLogos.length > 6 && (
          <div className={`text-center md:hidden -mt-12 mb-16`}>
            <button
              onClick={() => setShowAllPartners(!showAllPartners)}
              className="subtitle1 text-[#A8A8A8] hover:text-white transition-colors"
            >
              {showAllPartners ? "Show less" : "Show more"}
              <span style={{ marginLeft: 8 }}>
                {showAllPartners ? "↑" : "↓"}
              </span>
            </button>
          </div>
        )}
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
            const [cardStyles] = useAnimateIn(true, {
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
