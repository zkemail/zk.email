"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import Button from "./Button";

const Footer = () => {
  const [hoveredImages, setHoveredImages] = useState({
    XLogo: false,
    YoutubeLogo: false,
    TelegramLogo: false,
    GithubLogo: false,
  });
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("none");

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

  const subscribe = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      console.error("Please enter a valid email address");
      return;
    }

    setResult("pending");
    const proxy = `https://cors-proxy.fringe.zone/`;
    const url = `https://script.google.com/macros/s/AKfycbwFEpszXsb5PPsc6mrls71fWI4o6RAbV64okWWZ6yZBcv960oF-3ITi7-hw-5wA6ptV/exec`;
    const response = await fetch(proxy + url, {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.result === "success") {
      setResult("success");
    } else {
      setResult("none");
    }
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
            <Link
              href="https://zk.email/privacy-policy"
              className="subtitle2 text-[##A8A8A8] hover:text-white transition-colors"
              target="_blank"
            >
              Archive Policy
            </Link>
          </div>

          <div>
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
            <div className="w-full px-5 lg:px-0 lg:mr-12 mt-5">
              <p className="subtitle2 font-semibold leading-4" style={{ color: "white" }}>
                Subscribe
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Email Address"
                  className="inline-flex items-center border border-grey-500 disabled:border-grey-500 disabled:bg-neutral-100 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:text-grey-700 placeholder-text-grey-700::placeholder px-4 h-9 px-3 py-1 leading-[0.875rem] text-gray-800"
                />
                <Button
                  endIcon={
                    <Image
                      height={16}
                      width={16}
                      src="/assets/CaretRight.svg"
                      alt="caret-right"
                    />
                  }
                  onClick={subscribe}
                >
                  {result == "success"
                    ? "Subscribed ✔️"
                    : result == "pending"
                    ? "Subscribing..."
                    : "Subscribe"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
