import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: {
            td: {
              align: "center",
              textAlign: "center",
            },
            code: {
              color: "#FFFFFF",

              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              borderColor: "grey",
              borderWidth: "0.5px",
              fontWeight: "600px",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: "#1E1E1E",
              color: "white",
              padding: "1em",
              borderRadius: "0.5rem",
              overflowX: "auto",
            },
            "pre code": {
              backgroundColor: "transparent",
              color: "inherit",
            },
            "h1 a": {
              fontSize: "32px",
              fontWeight: "700",
              textDecoration: "none",
            },
            "h2 a": {
              fontSize: "24px",
              fontWeight: "700",
              textDecoration: "none",
            },
            "h3 a": {
              fontSize: "20px",
              fontWeight: "700",
              textDecoration: "none",
            },
            "h4 a": {
              fontWeight: "700",
              textDecoration: "none",
            },
            "ul li": {
              background: "**",
            },
            blockquote: {
              fontFamily: "Newsreader",
              fontWeight: 300,
              fontStyle: "normal",
              borderColor: '#606060'
            },
            '.footnotes br': {
              marginBottom: '1.5em',
              content: '""',
              display: 'block',
            },
            '.footnotes p': {
              marginBottom: '1.5em',
            },
            '.footnotes li': {
              marginBottom: '1.5em',
            }
          },
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
