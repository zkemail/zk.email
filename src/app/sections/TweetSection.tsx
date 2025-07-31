"use client";

import { useRef, useState } from "react";
import { useAnimateIn } from "../hooks/useAnimateIn";

const FAMOUS_TWEETS = [
  {
    id: 1,
    author: "Vitalik Buterin",
    handle: "@VitalikButerin",
    title: "Founder of Ethereum",
    profileImage: "/assets/vitalik-profile.jpg",
    content: "Glad to see @zkemail starting to make major steps toward real world adoption. It feels like the different pieces of social recovery are coming together!",
    tweetUrl: "https://x.com/VitalikButerin/status/1821668593689620877"
  },
  {
    id: 2,
    author: "Richard Liang",
    handle: "@richardzliang",
    title: "ZKP2P Team",
    profileImage: "/assets/richard-profile.jpg",
    content: "It's still the only primitive in production that provides true data provenance--data is signed at source with no trust needed in a 3rd party notary.",
    tweetUrl: "https://x.com/richardzliang/status/1821668593689620877"
  },
  {
    id: 3,
    author: "Sylve Chevet",
    handle: "@sylvechv",
    title: "Co-Founder of Hyle & BriqNFT",
    profileImage: "/assets/sylve-profile.jpg",
    content: "This is some ridiculous amount of work being done by the zkemail team there.",
    tweetUrl: "https://x.com/sylvechv/status/1924511710062252090"
  },
  {
    id: 4,
    author: "Zachary Williamson",
    handle: "@Zac_Aztec",
    title: "CEO of Aztec",
    profileImage: "/assets/zach-profile.jpg",
    content: "They're doing God's work with zkemail - one of the first truly accessible uses of genuine zero-knowledge!",
    tweetUrl: "https://x.com/Zac_Aztec/status/1849125687313277068"
  }
];

const TweetCard = ({
  author,
  handle,
  title,
  profileImage,
  content,
  tweetUrl
}: {
  author: string;
  handle: string;
  title: string;
  profileImage: string;
  content: string;
  tweetUrl: string;
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [opacity, setOpacity] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleCardClick = () => {
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View tweet by ${author}`}
      className="card-spotlight-effect cursor-pointer"
      style={{
        width: "100%",
        height: "260px",
        border: "1px solid #272727",
        overflow: "hidden",
        position: "relative"
      }}
    >
      <div
        className="spotlight"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.06), transparent 40%)`,
          zIndex: 10
        }}
      />

      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Tweet Content Container with Background */}
        <div
          style={{
            padding: "20px",
            background: "var(--Grey-900, #161819)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          {/* Top content area - Header and Content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Tweet Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  backgroundColor: "#333",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img
                  src={profileImage}
                  alt={`${author} profile`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                  onError={(e) => {
                    // Fallback to initial if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span style="color: white; font-weight: bold; font-size: 18px;">${author.charAt(0)}</span>`;
                    }
                  }}
                />
              </div>
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <p className="subtitle1" style={{ fontWeight: 700, color: "white", margin: 0, textAlign: "left" }}>
                    {author}
                  </p>
                  <p className="caption" style={{ color: "#8B949E", margin: 0, fontSize: "14px", textAlign: "left" }}>
                    {handle}
                  </p>
                </div>
              </div>
            </div>

                      {/* Tweet Content */}
          <p className="body1" style={{ color: "white", lineHeight: "1.5", margin: 0, textAlign: "left" }}>
            {content}
          </p>
        </div>
      </div>

      {/* Person Title - Separate section with line separator */}
      <div
        style={{
          borderTop: "1px solid #272727",
          padding: "16px 20px",
          background: "var(--Grey-900, #161819)"
        }}
      >
        <p className="caption" style={{ color: "#8B949E", margin: 0, fontSize: "14px", textAlign: "left" }}>
          {title}
        </p>
      </div>
      </div>
    </div>
  );
};

const TweetSection = () => {
  const [styles, ref] = useAnimateIn();

  return (
    <section ref={ref} style={styles}>
      <div
        className="container-width container-padding"
        style={{ textAlign: "center" }}
      >
        <p className="h3" style={{ marginBottom: "0rem" }}>Testimonials</p>
        <p className="subtitle1" style={{ color: "#8B949E", marginBottom: "3rem", maxWidth: "600px", margin: "0 auto" }}>
          Insights from industry leaders and innovators
        </p>
        
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            gap: "24px",
            marginTop: "3rem"
          }}
        >
          {FAMOUS_TWEETS.map((tweet) => (
            <TweetCard key={tweet.id} {...tweet} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TweetSection;