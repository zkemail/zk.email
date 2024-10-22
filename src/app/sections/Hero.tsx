'use client'

import { Fragment } from "react";
import Button from "../components/Button";

const MARQUEE_ITEMS = [
  "Restore your wallet",
  "Prove your identity",
  "Whistleblowing",
  "Prove your organization",
  "Send or receive assets",
];

const Hero = () => {
  return (
    <section style={{ height: "100vh" }}>
      <div
        className="w-full lg:w-[70vw] pt-40 lg:pt-32"
        style={{
          textAlign: "center",
        }}
      >
        <p
          className="h1"
          style={{
            letterSpacing: "-0.6px",
            fontStyle: "normal",
            alignSelf: "stretch",
          }}
        >
          Bringing on-chain trust to the masses through intuitive email
          integrations
        </p>
        <p
          className="subtitle1"
          style={{ marginTop: "1rem", textWrap: "balance" }}
        >
          Extensive set of open source SDKs, libraries, and
          <br /> protocols that enables email-based identity
        </p>
        <div className="flex gap-8 justify-center pt-10 lg:pt-8">
          <Button
            href="https://prove.email/"
            color="primary"
            endIcon={'/assets/CaretRight.svg'}
          >
            Learn
          </Button>
          <Button
            href="https://prove.email/"
            color="secondary"
            endIcon={'/assets/FileTextIcon.svg'}
          >
            Docs
          </Button>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "100%",
          borderRadius: "447px",
          background: "rgba(41, 67, 91, 0.12)",
          filter: "blur(85px)",
          width: "447px",
          height: "413px",
          flexShrink: 0,
          transform: "translateY(-50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "100vw",
          bottom: 0,
          maxHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={'/assets/HeroImgMobile.webp'}
          alt="hero-image"
          className="image-mobile"
          style={{
            maxWidth: "70vw",
            maxHeight: "calc(50vh - 1.5rem)",
            borderRadius: "24px 24px 0 0",
            boxShadow:
              "0px -4px 32px 0px rgba(0, 0, 0, 0.32), 0px 4px 4px 0px rgba(29, 29, 29, 0.60) inset",
          }}
        />
        <img
          src={'/assets/HeroImg.webp'}
          alt="hero-image"
          className="image-desktop"
          style={{
            maxWidth: "70vw",
            maxHeight: "calc(50vh - 1.5rem)",
            borderRadius: "24px 24px 0 0",
            boxShadow:
              "0px -4px 32px 0px rgba(0, 0, 0, 0.32), 0px 4px 4px 0px rgba(29, 29, 29, 0.60) inset",
          }}
        />
        <div className="marquee">
          <div className="marquee-container">
            <div className="marquee-inner">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
                (item, index) => (
                  <Fragment key={index}>
                    <span className="marquee-item">{item}</span>
                    <img src={'/assets/MarqueeSeparator.svg'} alt="◆" />
                  </Fragment>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;