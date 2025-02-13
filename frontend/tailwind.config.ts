import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/ui/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        switch:
          "0px 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 3px 8px 0px rgba(0, 0, 0, 0.15), 0px 3px 1px 0px rgba(0, 0, 0, 0.06)",
        button: "0px 1px 4px 0px rgba(0, 0, 0, 0.24), 0px 0px 2px 0px rgba(0, 0, 0, 0.24)",
        modal: "0px 16px 24px 0px rgba(0, 0, 0, 0.24), 0px 4px 16px 0px rgba(0, 0, 0, 0.25)",
        border: "0px 1px 4px 0px rgba(0, 0, 0, 0.16), 0px 0px 2px 0px rgba(0, 0, 0, 0.16)",
        dropdown:
          "0px 0px 24px 0px rgba(0, 0, 0, 0.08), 0px 0px 2px 0px rgba(0, 0, 0, 0.08), 0px 1px 3px 0px rgba(0, 0, 0, 0.08)",
      },
      colors: {
        white: "#ffff",
        primary: {
          "50": "#e6f9f9",
          "100": "#b1ebeb",
          "200": "#8be2e2",
          "300": "#56d4d5",
          "400": "#35cccd",
          "500": "#03bfc0",
          "600": "#03aeaf",
          "700": "#028888",
          "800": "#02696a",
          "900": "#015051",
        },
      },
    },
  },
  plugins: [],
};
export default config;
