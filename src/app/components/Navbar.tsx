"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAnimateIn } from "../hooks/useAnimateIn";
import { posthog } from "posthog-js";

const SubItemDesktop = ({
  icon,
  title,
  description,
  href,
  onClick,
}: {
  icon: string;
  title: string;
  description: string;
  href: string;
  onClick: () => void;
}) => (
  <Link
    href={href}
    target={href.includes("http") ? "_blank" : "_self"}
    className="nav-sub-items max-w-full w-full flex-col justify-center flex-grow flex items-center rounded-lg pb-4"
    onClick={onClick}
  >
    <Image src={icon} alt={title} width={171} height={136} />
    <p className="font-semibold body1">{title}</p>
    <p className="subtitle2" style={{ color: "#A8A8A8" }}>
      {description}
    </p>
  </Link>
);

type SubItemData = {
  icon: string;
  title: string;
  description: string;
  href: string;
};

const NAV_ITEMS_DATA: {
  developers: SubItemData[];
  community: SubItemData[];
} = {
  developers: [
    {
      icon: "/assets/NavDocumentation.png",
      title: "Documentation",
      description: "Get started with our tech",
      href: "https://docs.zk.email",
    },
    {
      icon: "/assets/NavProjects.png",
      title: "Projects",
      description: "Ideas built on our stack",
      href: "/projects",
    },
    {
      icon: "/assets/NavChangelogs.png",
      title: "Changelogs",
      description: "We ship things quite fast",
      href: "/changelogs",
    },
  ],
  community: [
    {
      icon: "/assets/NavBlogs.png",
      title: "Blogs",
      description: "Our team battlefield notes",
      href: "/blog",
    },
    {
      icon: "/assets/NavCaseStudies.png",
      title: "Case Studies",
      description: "Real-world integrations",
      href: "/case-studies",
    },
    {
      icon: "/assets/NavPartners.png",
      title: "Partner",
      description: "Let's build the future",
      href: "https://t.me/zkemail",
    },
    // {
    //   icon: "/assets/NavLearnMore.png",
    //   title: "Learn More",
    //   description: "About our underlying tech",
    //   href: "/learn-more",
    // },
  ],
};

const Navbar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [visibleItems, setVisibleItems] = useState<number>(0);
  const [showContent, setShowContent] = useState(false);
  const contentRefDesktop = useRef<HTMLDivElement>(null);
  const contentRefMobile = useRef<HTMLDivElement>(null);

  console.log(contentHeight);

  useEffect(() => {
    setIsNavbarVisible(true);
  }, []);

  useEffect(() => {
    if (hoveredSection) {
      // Reset content visibility first
      setShowContent(false);

      // Wait for height transition to complete (300ms) before showing content
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 300); // matches the transition duration in the parent

      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [hoveredSection]);

  useEffect(() => {
    if (hoveredSection) {
      if (
        contentRefDesktop.current &&
        contentRefDesktop.current.scrollHeight > 0
      ) {
        setContentHeight(contentRefDesktop.current.scrollHeight);
      }

      if (
        contentRefMobile.current &&
        contentRefMobile.current.scrollHeight > 0
      ) {
        setContentHeight(contentRefMobile.current.scrollHeight);
      }
      const itemCount =
        hoveredSection !== "breadcrumb" &&
        NAV_ITEMS_DATA[hoveredSection as keyof typeof NAV_ITEMS_DATA].length;
      const interval = setInterval(() => {
        setVisibleItems((prev) => {
          if (prev < itemCount) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setContentHeight(0);
      setVisibleItems(0);
    }
  }, [hoveredSection]);

  const handleMouseEnter = (section: string) => {
    setHoveredSection(section);
  };

  const handleMouseLeave = () => {
    setHoveredSection(null);
  };

  const [animateInStyles] = useAnimateIn(showContent);

  return (
    <>
      <nav
        className="navbar container-width navbar-desktop relative flex flex-col gap-0"
        style={{
          opacity: isNavbarVisible ? 1 : 0,
          filter: isNavbarVisible ? "blur(0px)" : "blur(8px)",
          transition: `opacity 0.3s ease-in-out 100ms, 
                      filter 0.3s ease-in-out 100ms, height 0.3s ease-in-out`,
          willChange: "opacity, filter, height",
        }}
      >
        <div className="w-full flex flex-row justify-between">
          <Link href="/">
            <Image
              src={"/assets/Logo.svg"}
              alt="zkemail-logo"
              height={20}
              width={94}
            />
          </Link>
          <div style={{ display: "flex", gap: 8 }}>
            <div
              onMouseEnter={() => handleMouseEnter("developers")}
              onMouseLeave={handleMouseLeave}
              className="px-2"
            >
              <p
                className="body1"
                style={{
                  color:
                    hoveredSection === "developers" || hoveredSection === null
                      ? "#F5F3EF"
                      : "#3B3B3B",
                }}
              >
                Developers
              </p>
            </div>

            <div
              onMouseEnter={() => handleMouseEnter("community")}
              onMouseLeave={handleMouseLeave}
              className="px-2"
            >
              <p
                className="body1"
                style={{
                  color:
                    hoveredSection === "community" || hoveredSection === null
                      ? "#F5F3EF"
                      : "#3B3B3B",
                }}
              >
                Community
              </p>
            </div>
          </div>
        </div>
        <div
          ref={contentRefDesktop}
          className="w-full grid grid-cols-3 justify-between gap-3 overflow-hidden"
          onMouseEnter={() =>
            hoveredSection && handleMouseEnter(hoveredSection)
          }
          onMouseLeave={handleMouseLeave}
        >
          {hoveredSection &&
            hoveredSection !== "breadcrumb" &&
            NAV_ITEMS_DATA[hoveredSection as keyof typeof NAV_ITEMS_DATA].map(
              (item, index) => (
                <div
                  key={index}
                  className="w-full max-w-full h-full"
                  style={{
                    paddingTop: hoveredSection ? 16 : 0,
                    opacity: index < visibleItems ? 1 : 0,
                    transform: `translateY(${index < visibleItems ? 0 : 20}px)`,
                    transition:
                      "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
                  }}
                >
                  <SubItemDesktop
                    onClick={() => {
                      posthog.capture(`$navbar_item_clicked:${item.title}`);
                      handleMouseLeave();
                    }}
                    {...item}
                  />
                </div>
              )
            )}
        </div>
      </nav>

      <nav
        className="navbar container-width navbar-mobile relative flex flex-col"
        style={{
          borderRadius: 16,
          height: hoveredSection ? "calc(100dvh + 24px - 60px)" : "60px",
          backgroundImage: hoveredSection
            ? "url(/assets/MobileNavBackground.webp)"
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isNavbarVisible ? 1 : 0,
          filter: isNavbarVisible ? "blur(0px)" : "blur(8px)",
          transition: `opacity 0.3s ease-in-out 100ms, 
                      filter 0.3s ease-in-out 100ms, height 0.3s ease-in-out`,
          willChange: "opacity, filter, height",
        }}
      >
        <div className="flex flex-row w-full justify-between items-center">
          <Link href="/">
            <Image
              height={20}
              width={94}
              src={"/assets/Logo.svg"}
              alt="zkemail-logo"
            />
          </Link>
          <Image
            className="ml-auto"
            onClick={() => {
              if (hoveredSection === null) {
                return handleMouseEnter("breadcrumb");
              }

              handleMouseLeave();
            }}
            src={
              hoveredSection
                ? "/assets/CrossIcon.svg"
                : "/assets/Breadcrumb.svg"
            }
            alt="BreadCrumb"
            height={24}
            width={24}
          />
        </div>
        {hoveredSection && (
          <div className="flex flex-col w-full" style={animateInStyles}>
            {Object.entries(NAV_ITEMS_DATA).map(([section, items]) => (
              <div key={section} className="mb-8">
                <h2 className="h4 font-semibold mb-4 capitalize">{section}</h2>
                {items.map((item, index) => (
                  <Link
                    href={item.href}
                    onClick={() => handleMouseLeave()}
                    key={index}
                    className="block mb-4"
                  >
                    <p className="h6 font-medium" style={{ color: "#F5F3EF" }}>
                      {item.title}
                    </p>
                    <p className="subtitle2 text-gray-400">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
        {hoveredSection ? (
          <div
            className="flex flex-row w-full justify-between"
            style={animateInStyles}
          >
            <div>
              <p>Privacy Policy</p>
            </div>
            <div>
              <div className="flex flex-row gap-3">
                <Link href="https://x.com/zkemail?lang=en" target="_blank">
                  <Image
                    src={"/assets/XLogo.svg"}
                    alt="twitter-logo"
                    height={20}
                    width={20}
                    priority
                  />
                </Link>
                <Link href="https://www.youtube.com/@sigsing" target="_blank">
                  <Image
                    src={"/assets/YoutubeLogo.svg"}
                    alt="youtube-logo"
                    height={20}
                    width={20}
                    priority
                  />
                </Link>
                <Link href="https://t.me/zkemail" target="_blank">
                  <Image
                    src={"/assets/TelegramLogo.svg"}
                    alt="telegram-logo"
                    height={20}
                    width={20}
                    priority
                  />
                </Link>
                <Link href="https://github.com/zkemail" target="_blank">
                  <Image
                    src={"/assets/GithubLogo.svg"}
                    alt="github-logo"
                    height={20}
                    width={20}
                    priority
                  />
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </nav>
    </>
  );
};

export default Navbar;
