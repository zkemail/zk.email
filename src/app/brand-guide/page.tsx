"use client";

import React, { useState } from "react";
import Button from "../components/Button";
import Image from "next/image";

const BrandGuidePage = () => {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);
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

  const copySVG = async (url: string, logoId: string) => {
    try {
      const response = await fetch(url);
      const svgContent = await response.text();
      await navigator.clipboard.writeText(svgContent);
      setCopySuccess(logoId);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const LogoContainer = ({ 
    src, 
    alt, 
    logoId, 
    filename, 
    className = "", 
    containerClassName = "",
    imageClassName = ""
  }: {
    src: string;
    alt: string;
    logoId: string;
    filename: string;
    className?: string;
    containerClassName?: string;
    imageClassName?: string;
  }) => (
    <div 
      className={`relative group transition-all duration-200 ${containerClassName}`}
      onMouseEnter={() => setHoveredLogo(logoId)}
      onMouseLeave={() => setHoveredLogo(null)}
    >
      <div className={className}>
        <img 
          src={src}
          alt={alt}
          className={imageClassName}
        />
      </div>
      
      {/* Top Right Icon Buttons */}
      {hoveredLogo === logoId && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={() => copySVG(src, logoId)}
            className="bg-gray-700 hover:bg-gray-800 text-white p-2 rounded-lg transition-colors duration-200"
            title="Copy SVG"
          >
            {copySuccess === logoId ? (
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
            onClick={() => downloadSVG(src, filename)}
            className="bg-gray-700 hover:bg-gray-800 text-white p-2 rounded-lg transition-colors duration-200"
            title="Download SVG"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="grid-container">
      <div className="noise-layer"></div>
      <div className="noise-container">
        <div className="container-width mx-auto px-6 py-32 space-y-24">
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
                      <strong className="text-white">"ZK Email"</strong> is spelled with capital "Z", "K", and "E"
                    </p>
                  </div>
                  
                  <div className="flex gap-3 items-start">
                    <div className="w-3 h-3 rotate-[-45deg] rounded-[2.268px] border border-[#2962A5] bg-[#062E5D] mt-1 flex-shrink-0"></div>
                    <p className="body1 text-gray-300 leading-relaxed">
                      <strong className="text-white">"zkemail"</strong> is spelled with lowercase "z", "k", and "e"
                    </p>
                  </div>
                </div>
                
                <p className="body1 text-gray-300 leading-relaxed">
                  It is the brand name of both our organization and our products. Provide plenty of space around ZK Email assets. Make them big or make them small, but give them room to breathe. They shouldn't feel cramped or cluttered.
                </p>
              </div>
            </div>
          </section>

          {/* Brandmark Section */}
          <section className="max-w-6xl mx-auto space-y-12">
            <div className="space-y-6">
              <h2 className="h2 text-white">Brandmark</h2>
              <div className="space-y-6">
                <p className="body1 text-gray-300 leading-relaxed">
                  The ZK Email brandmark should be used in all references to ZK Email as space allows. Monochrome usage is preferred with the brand colors to the left.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Primary Logo */}
                  <LogoContainer
                    src="/assets/Logo.svg"
                    alt="ZK Email Logo"
                    logoId="brandmark-primary"
                    filename="zkemail-logo-primary.svg"
                    className="bg-gray-900 rounded-lg flex items-center justify-center min-h-[200px]"
                    imageClassName="w-40 h-auto"
                  />
                  
                  {/* White Background Version */}
                  <LogoContainer
                    src="/assets/Logo.svg"
                    alt="ZK Email Logo on White"
                    logoId="brandmark-white-bg"
                    filename="zkemail-logo-white-bg.svg"
                    className="bg-white rounded-lg flex items-center justify-center min-h-[200px]"
                    imageClassName="w-40 h-auto filter invert"
                  />
                  
                  {/* Brand Color Version */}
                  <LogoContainer
                    src="/assets/Logo.svg"
                    alt="ZK Email Logo on Brand Color"
                    logoId="brandmark-brand-color"
                    filename="zkemail-logo-brand-color.svg"
                    className="bg-blue-600 rounded-lg flex items-center justify-center min-h-[200px]"
                    imageClassName="w-40 h-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Logo Section */}
          <section className="max-w-6xl mx-auto space-y-12">
            <div className="space-y-6">
              <h2 className="h2 text-white">Logo</h2>
              <div className="space-y-6">
                <p className="body1 text-gray-300 leading-relaxed">
                  For tight layouts or logo-only grids, the ZK Email logomark is a concise way to refer to ZK Email. Use with good judgment for your audience, as the ZK Email wordmark has stronger brand recognition.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <LogoContainer
                    src="/assets/ShortLogo.svg"
                    alt="ZK Email Short Logo"
                    logoId="logo-primary"
                    filename="zkemail-logomark-primary.svg"
                    className="bg-gray-900 rounded-lg p-6 flex items-center justify-center min-h-[150px]"
                    imageClassName="w-28 h-auto"
                  />
                  
                  <LogoContainer
                    src="/assets/ShortLogo.svg"
                    alt="ZK Email Short Logo on White"
                    logoId="logo-white-bg"
                    filename="zkemail-logomark-white-bg.svg"
                    className="bg-white rounded-lg p-6 flex items-center justify-center min-h-[150px]"
                    imageClassName="w-28 h-auto filter invert"
                  />
                  
                  <LogoContainer
                    src="/assets/ShortLogo.svg"
                    alt="ZK Email Short Logo on Brand Color"
                    logoId="logo-brand-color"
                    filename="zkemail-logomark-brand-color.svg"
                    className="bg-blue-600 rounded-lg p-6 flex items-center justify-center min-h-[150px]"
                    imageClassName="w-28 h-auto"
                  />
                  
                  <LogoContainer
                    src="/assets/ShortLogo.svg"
                    alt="ZK Email Short Logo on Gray"
                    logoId="logo-gray-bg"
                    filename="zkemail-logomark-gray-bg.svg"
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
                  ZK Email's primary brand color is blue. White and off-black are preferred for monochrome brandmark usage, while the brand color is typically reserved for backgrounds and accents.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Primary Blue */}
                  <div className="space-y-3">
                    <div className="bg-blue-600 rounded-lg h-24 w-full"></div>
                    <div className="text-center">
                      <p className="text-white font-medium">Primary Blue</p>
                      <p className="text-gray-400 text-sm">#2563EB</p>
                    </div>
                  </div>
                  
                  {/* White */}
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg h-24 w-full border border-gray-600"></div>
                    <div className="text-center">
                      <p className="text-white font-medium">White</p>
                      <p className="text-gray-400 text-sm">#FFFFFF</p>
                    </div>
                  </div>
                  
                  {/* Off Black */}
                  <div className="space-y-3">
                    <div className="bg-gray-900 rounded-lg h-24 w-full"></div>
                    <div className="text-center">
                      <p className="text-white font-medium">Off Black</p>
                      <p className="text-gray-400 text-sm">#111314</p>
                    </div>
                  </div>
                  
                  {/* Gray */}
                  <div className="space-y-3">
                    <div className="bg-gray-600 rounded-lg h-24 w-full"></div>
                    <div className="text-center">
                      <p className="text-white font-medium">Gray</p>
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