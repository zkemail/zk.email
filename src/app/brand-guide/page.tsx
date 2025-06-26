"use client";

import React, { useState } from "react";
import Button from "../components/Button";
import Image from "next/image";

const BrandGuidePage = () => {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const downloadSVG = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const svgContent = await response.text();
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const downloadUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const copySVG = async (url: string, sectionId: string) => {
    try {
      const response = await fetch(url);
      const svgContent = await response.text();
      await navigator.clipboard.writeText(svgContent);
      setCopySuccess(sectionId);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const LogoContainer = ({ 
    src, 
    alt, 
    className = "", 
    imageClassName = ""
  }: {
    src: string;
    alt: string;
    className?: string;
    imageClassName?: string;
  }) => (
    <div className={className}>
      <img 
        src={src}
        alt={alt}
        className={imageClassName}
      />
    </div>
  );

  const SectionHeader = ({ 
    title, 
    svgUrl, 
    filename, 
    sectionId 
  }: { 
    title: string; 
    svgUrl: string; 
    filename: string; 
    sectionId: string; 
  }) => (
    <div className="flex items-center gap-4">
      <h2 className="h2 text-white">{title}</h2>
      <div className="flex space-x-2">
        <button
          onClick={() => copySVG(svgUrl, sectionId)}
          className="bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-lg transition-colors duration-200"
          title="Copy SVG"
        >
          {copySuccess === sectionId ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
        <button
          onClick={() => downloadSVG(svgUrl, filename)}
          className="bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-lg transition-colors duration-200"
          title="Download SVG"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="grid-container">
      <div className="noise-layer"></div>
      <div className="noise-container">
        <div className="container-width mx-auto px-6 py-36 space-y-24">
          {/* Header Section */}
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="h1 text-white">Brand guide</h1>
              <p className="subtitle1 max-w-2xl mx-auto">
                Resources for presenting the ZK Email brand consistently and professionally.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button
                color="secondary"
                href="https://github.com/zkemail/brand-assets"
                endIcon={
                  <Image
                    height={16}
                    width={16}
                    src="/assets/arrowRight.svg"
                    alt="arrow-right"
                  />
                }
              >
                Download assets
              </Button>
            </div>
          </div>

          {/* Naming and Usage Section */}
          <section className="max-w-6xl mx-auto space-y-12">
            <div className="space-y-6">
              <h2 className="h2 text-white">Naming and usage</h2>
              <div className="space-y-4">
                                  <p className="body1 text-gray-300 leading-relaxed mb-4">
                   There are two ways to write the name:
                  </p>
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-3 h-3 rotate-[-45deg] rounded-[2.268px] border border-[#2962A5] bg-[#062E5D] mt-1 flex-shrink-0"></div>
                    <p className="body1 text-gray-300 leading-relaxed">
                      <strong className="text-white">&ldquo;ZK Email&rdquo;</strong> is spelled with capital &ldquo;Z&rdquo;, &ldquo;K&rdquo;, and &ldquo;E&rdquo;
                    </p>
                  </div>
                  
                  <div className="flex gap-3 items-start">
                    <div className="w-3 h-3 rotate-[-45deg] rounded-[2.268px] border border-[#2962A5] bg-[#062E5D] mt-1 flex-shrink-0"></div>
                    <p className="body1 text-gray-300 leading-relaxed">
                      <strong className="text-white">&ldquo;zkemail&rdquo;</strong> is spelled with lowercase &ldquo;z&rdquo;, &ldquo;k&rdquo;, and &ldquo;e&rdquo; with no spaces
                    </p>
                  </div>
                </div>
                
                <p className="body1 text-gray-300 leading-relaxed">
                  It is the brand name of both our organization and our products. Provide plenty of space around ZK Email assets. Make them big or make them small, but give them room to breathe. They shouldn&apos;t feel cramped or cluttered.
                </p>
              </div>
            </div>
          </section>

          {/* Brand Guideline Download Section */}
          <section className="max-w-6xl mx-auto">
            <div className="bg-black/20 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Cover Image */}
                <div className="relative">
                  <div className="aspect-[16/9] overflow-hidden">
                    <Image
                      src="/assets/ZKSlab.png"
                      alt="ZK Email Brand Guide Cover"
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                </div>
                
                {/* Download Content */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Complete Brand Book</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Download our comprehensive brand guideline document containing detailed usage instructions and common dos and don&apos;ts.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    {/* <h4 className="text-lg font-semibold text-white">What's included:</h4> */}
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-3">
                        <div className="w-3 h-3 rotate-[-45deg] rounded-[2.268px] border border-[#2962A5] bg-[#062E5D] flex-shrink-0"></div>
                        Logo usage guidelines and variations
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-3 h-3 rotate-[-45deg] rounded-[2.268px] border border-[#2962A5] bg-[#062E5D] flex-shrink-0"></div>
                        Color palette and specifications
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-3 h-3 rotate-[-45deg] rounded-[2.268px] border border-[#2962A5] bg-[#062E5D] flex-shrink-0"></div>
                        Do&apos;s and don&apos;ts for brand application
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-start">
                    <a
                      href="/assets/ZKEmailBrandBook.pdf"
                      download="zkemail Brand Book.pdf"
                      className="flex flex-row justify-between items-center gap-2 border-solid border-[2px] rounded-[12px] px-[16px] py-[5px] font-semibold border-[#3B3B3B] bg-[#1C1C1C] text-[#F5F3EF] hover:bg-[#2C2C2C] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Brandmark Section */}
          <section className="max-w-6xl mx-auto space-y-12">
            <div className="space-y-6">
              <SectionHeader
                title="Brandmark"
                svgUrl="/assets/Logo.svg"
                filename="zkemail-brandmark.svg"
                sectionId="brandmark"
              />
              <div className="space-y-6">
                <p className="body1 text-gray-300 leading-relaxed">
                  The ZK Email brandmark should be used in all references to ZK Email as space allows. Monochrome usage is preferred with the brand colors to the left.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Primary Logo */}
                  <LogoContainer
                    src="/assets/Logo.svg"
                    alt="ZK Email Logo"
                    className="bg-gray-900 rounded-lg flex items-center justify-center min-h-[200px]"
                    imageClassName="w-40 h-auto"
                  />
                  
                  {/* White Background Version */}
                  <LogoContainer
                    src="/assets/Logo.svg"
                    alt="ZK Email Logo on White"
                    className="bg-white rounded-lg flex items-center justify-center min-h-[200px]"
                    imageClassName="w-40 h-auto filter invert"
                  />
                  
                  {/* Brand Color Version */}
                  <div className="rounded-lg flex items-center justify-center min-h-[200px]" style={{ backgroundColor: '#2962A5' }}>
                    <img 
                      src="/assets/Logo.svg"
                      alt="ZK Email Logo on Brand Color"
                      className="w-40 h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Logo Section */}
          <section className="max-w-6xl mx-auto space-y-12">
            <div className="space-y-6">
              <SectionHeader
                title="Logo"
                svgUrl="/assets/ShortLogo.svg"
                filename="zkemail-logo.svg"
                sectionId="logo"
              />
              <div className="space-y-6">
                <p className="body1 text-gray-300 leading-relaxed">
                  For tight layouts or logo-only grids, the ZK Email logomark is a concise way to refer to ZK Email. Use with good judgment for your audience, as the ZK Email wordmark has stronger brand recognition.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <LogoContainer
                    src="/assets/ShortLogo.svg"
                    alt="ZK Email Short Logo"
                    className="bg-gray-900 rounded-lg p-6 flex items-center justify-center min-h-[150px]"
                    imageClassName="w-28 h-auto"
                  />
                  
                  <LogoContainer
                    src="/assets/ShortLogo.svg"
                    alt="ZK Email Short Logo on White"
                    className="bg-white rounded-lg p-6 flex items-center justify-center min-h-[150px]"
                    imageClassName="w-28 h-auto filter invert"
                  />
                  
                  <div className="rounded-lg p-6 flex items-center justify-center min-h-[150px]" style={{ backgroundColor: '#2962A5' }}>
                    <img 
                      src="/assets/ShortLogo.svg"
                      alt="ZK Email Short Logo on Brand Color"
                      className="w-28 h-auto"
                    />
                  </div>
                  
                  <LogoContainer
                    src="/assets/ShortLogo.svg"
                    alt="ZK Email Short Logo on Gray"
                    className="bg-gray-700 rounded-lg p-6 flex items-center justify-center min-h-[150px]"
                    imageClassName="w-28 h-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Colors Section */}
          <section className="max-w-6xl mx-auto space-y-12">
            <div className="space-y-6">
              <h2 className="h2 text-white">Colors</h2>
              <div className="space-y-6">
                <p className="body1 text-gray-300 leading-relaxed">
                  ZK Email&apos;s primary brand color is blue. White and off-black are preferred for monochrome brandmark usage, while the brand color is typically reserved for backgrounds and accents.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Primary Blue */}
                  <div className="space-y-3">
                    <div className="rounded-lg h-24 w-full" style={{ backgroundColor: '#2962A5' }}></div>
                    <div className="text-center">
                      <p className="text-white font-medium">Privacy Blue</p>
                      <p className="text-gray-400 text-sm">#2962A5</p>
                    </div>
                  </div>
                  
                  {/* White */}
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg h-24 w-full border border-gray-600"></div>
                    <div className="text-center">
                      <p className="text-white font-medium">True White</p>
                      <p className="text-gray-400 text-sm">#FFFFFF</p>
                    </div>
                  </div>
                  
                  {/* Off Black */}
                  <div className="space-y-3">
                    <div className="bg-gray-900 rounded-lg h-24 w-full"></div>
                    <div className="text-center">
                      <p className="text-white font-medium">ZK Black</p>
                      <p className="text-gray-400 text-sm">#111314</p>
                    </div>
                  </div>
                  
                  {/* Gray */}
                  <div className="space-y-3">
                    <div className="bg-gray-600 rounded-lg h-24 w-full"></div>
                    <div className="text-center">
                      <p className="text-white font-medium">Regex Gray</p>
                      <p className="text-gray-400 text-sm">#A8A8A8</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Notice */}
          <section className="max-w-6xl mx-auto">
            <div className="bg-gray-900 rounded-lg p-6">
              <p className="text-gray-300 text-sm leading-relaxed">
                This is a friendly reminder that the provided graphics are proprietary and protected under intellectual property laws. Get in touch if you have questions.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BrandGuidePage; 