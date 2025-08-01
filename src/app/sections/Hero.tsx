"use client";

import Button from "../components/Button";
import Image from "next/image";

const MARQUEE_ITEMS = [
  "Recover account",
  "Prove your identity",
  "Whistleblowing",
  "Prove your organization",
  "Send or receive assets",
];

import dynamic from "next/dynamic";
import { useAnimateIn } from "../hooks/useAnimateIn";
import { posthog } from "posthog-js";

const DynamicMarquee = dynamic(() => import("../components/Marquee"), {
  ssr: false,
});

const Hero = () => {
  // Create refs for different sections
  const [headingStyles, headingRef] = useAnimateIn(undefined, { delay: 0 });
  const [subtitleStyles, subtitleRef] = useAnimateIn(undefined, { delay: 100 });
  const [buttonStyles, buttonRef] = useAnimateIn(undefined, { delay: 200 });
  const [imageStyles, imageRef] = useAnimateIn(undefined, { delay: 300 });

  return (
    <section style={{ height: "100vh" }}>
      <div
        className="w-full lg:w-[70vw] lg:max-w-[1100px] pt-32 lg:pt-32 h-[50vh] flex flex-col justify-center"
        style={{
          textAlign: "center",
        }}
      >
        <p
          ref={headingRef}
          className="h1"
          style={{
            ...headingStyles,
            letterSpacing: "-0.6px",
            fontStyle: "normal",
            alignSelf: "stretch",
          }}
        >
          <span className="hidden sm:inline">
            Building trustable identity through intuitive, private email
            verification
          </span>
          <span className="sm:hidden">
            Bringing trust through intuitive email proofs
          </span>
        </p>
        <p
          ref={subtitleRef}
          className="subtitle1"
          style={{
            ...subtitleStyles,
            marginTop: "1rem",
            textWrap: "balance",
          }}
        >
          Extensive set of open source SDKs, libraries, and
          <br /> protocols that enable email-based identity
        </p>
        <div
          ref={buttonRef}
          className="flex gap-8 justify-center pt-6  sm:pt-10 lg:pt-8"
          style={buttonStyles}
        >
          <Button
            onClick={async () => {
              await posthog.capture("$get_started_clicked");
              window.open("https://docs.zk.email/introduction", "_blank");
            }}
            color="secondary"
            endIcon={
              <Image
                height={16}
                width={16}
                src="/assets/arrowRight.svg"
                alt="file-icon"
              />
            }
          >
            Get Started
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
          maxWidth: "100%",
          height: "413px",
          flexShrink: 0,
          transform: "translateY(-50%)",
        }}
      />
      <div
        ref={imageRef}
        style={{
          ...imageStyles,
          position: "absolute",
          width: "100vw",
          bottom: -1.5,
          maxHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src={"/assets/HeroImgMobile.webp"}
          alt="hero-image"
          className="image-mobile"
          style={{
            maxWidth: "70vw",
            maxHeight: "calc(50vh - 1.5rem)",
            borderRadius: "24px 24px 0 0",
            boxShadow:
              "0px -4px 32px 0px rgba(0, 0, 0, 0.32), 0px 4px 4px 0px rgba(29, 29, 29, 0.60) inset",
          }}
          height={922}
          width={412}
          priority
          loading="eager"
          placeholder="blur"
          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 412 922'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23718096'/%3E%3C/svg%3E"
          sizes="(max-width: 768px) 70vw, 412px"
        />
        <Image
          src={"/assets/HeroImg.webp"}
          alt="hero-image"
          className="image-desktop"
          style={{
            maxWidth: "70vw",
            maxHeight: "calc(50vh - 1.5rem)",
            borderRadius: "24px 24px 0 0",
            boxShadow:
              "0px -4px 32px 0px rgba(0, 0, 0, 0.32), 0px 4px 4px 0px rgba(29, 29, 29, 0.60) inset",
          }}
          height={321}
          width={412}
          layout="responsive"
        />

        <DynamicMarquee items={MARQUEE_ITEMS} />
      </div>
    </section>
  );
};

export default Hero;
