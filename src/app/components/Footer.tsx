"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Footer = () => {
  const [hoveredImages, setHoveredImages] = useState({
    XLogo: false,
    YoutubeLogo: false,
    TelegramLogo: false,
    GithubLogo: false,
  });

  const handleMouseEnter = (
    image: "XLogo" | "YoutubeLogo" | "TelegramLogo" | "GithubLogo"
  ) => {
    setHoveredImages((prev) => ({ ...prev, [image]: true }));
  };

  const handleMouseLeave = (
    image: "XLogo" | "YoutubeLogo" | "TelegramLogo" | "GithubLogo"
  ) => {
    setHoveredImages((prev) => ({ ...prev, [image]: false }));
  };

  return (
    <>
      <div
        className="flex flex-col sm:flex-row justify-between py-4 items-center"
        style={{ borderTop: "1px solid var(--Grey-800, #3B3B3B)" }}
      >
        <div>
          <Image
            className=" md:w-2/4 w-full lg:w-[640px]"
            src={"/assets/FooterLogo1.png"}
            alt="ZK Email Footer Logo"
            width={1800}
            height={1400}
            style={{ height: 'auto' }}
          />
        </div>
        <div className="flex flex-row justify-between w-full lg:w-[440px] px-5 pb-10 lg:p-0 lg:mr-12">
          <div className="flex flex-col gap-3">
            <p
              className="subtitle2 font-semibold leading-4"
              style={{ color: "white" }}
            >
              Developers
            </p>
            <Link
              href="https://docs.zk.email"
              target="_blank"
              className="subtitle2 text-[##A8A8A8] hover:text-white transition-colors"
            >
              Docs
            </Link>
            <Link href="/projects" className="subtitle2 text-[##A8A8A8] hover:text-white transition-colors">
              Projects
            </Link>
            <Link href="/changelogs" className="subtitle2 text-[##A8A8A8] hover:text-white transition-colors">
              Changelogs
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <p
              className="subtitle2 font-semibold leading-4"
              style={{ color: "white" }}
            >
              Community
            </p>
            <Link href="/blog" className="subtitle2 text-[##A8A8A8] hover:text-white transition-colors">
              Blogs
            </Link>
            <Link href="/case-studies" className="subtitle2 text-[##A8A8A8] hover:text-white transition-colors">
              Case Studies
            </Link>
            <Link
              href="https://t.me/zkemail"
              target="_blank"
              className="subtitle2 text-[##A8A8A8] hover:text-white transition-colors"
            >
              Partner
            </Link>
            <Link href="/privacy-policy" className="subtitle2 text-[##A8A8A8] hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/brand-guide" className="subtitle2 text-[##A8A8A8] hover:text-white transition-colors">
              Brand Guide
            </Link>
            <Link
              href="https://zk.email/privacy-policy"
              className="subtitle2 text-[##A8A8A8] hover:text-white transition-colors"
              target="_blank"
            >
              Archive Policy
            </Link>
          </div>

          <div className="flex flex-row gap-3">
            <Link href="https://x.com/zkemail?lang=en" target="_blank">
              <Image
                onMouseEnter={() => handleMouseEnter("XLogo")}
                onMouseLeave={() => handleMouseLeave("XLogo")}
                src={
                  hoveredImages["XLogo"]
                    ? "/assets/XLogoFilled.svg"
                    : "/assets/XLogo.svg"
                }
                alt="twitter-logo"
                style={{ width: '100%', height: 'auto' }}
                height={20}
                width={20}
              />
            </Link>
            <Link href="https://www.youtube.com/@sigsing" target="_blank">
              <Image
                onMouseEnter={() => handleMouseEnter("YoutubeLogo")}
                onMouseLeave={() => handleMouseLeave("YoutubeLogo")}
                src={
                  hoveredImages["YoutubeLogo"]
                    ? "/assets/YoutubeLogoFilled.svg"
                    : "/assets/YoutubeLogo.svg"
                }
                alt="youtube-logo"
                style={{ width: '100%', height: 'auto' }}
                height={20}
                width={20}
              />
            </Link>
            <Link href="https://t.me/zkemail" target="_blank">
              <Image
                onMouseEnter={() => handleMouseEnter("TelegramLogo")}
                onMouseLeave={() => handleMouseLeave("TelegramLogo")}
                src={
                  hoveredImages["TelegramLogo"]
                    ? "/assets/TelegramLogoFilled.svg"
                    : "/assets/TelegramLogo.svg"
                }
                alt="telegram-logo"
                style={{ width: '100%', height: 'auto' }}
                height={20}
                width={20}
              />
            </Link>
            <Link href="https://github.com/zkemail" target="_blank">
              <Image
                onMouseEnter={() => handleMouseEnter("GithubLogo")}
                onMouseLeave={() => handleMouseLeave("GithubLogo")}
                src={
                  hoveredImages["GithubLogo"]
                    ? "/assets/GithubLogoFilled.svg"
                    : "/assets/GithubLogo.svg"
                }
                alt="github-logo"
                style={{ width: '100%', height: 'auto' }}
                height={20}
                width={20}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
