module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      primary: "#1ACFC9",
      white: "#FFFFFF",
      secondary: "#06002E",
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492A6",
      "gray-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {},
  },

  plugins: [
    require("@tailwindcss/forms"),
    // require("@tailwindcss/typography"),
    require("daisyui"),
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/line-clamp"),
  ],

  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          // primary: "#1ACFC9",
          primary: "#06002E",
          // secondary: "#06002E",
          secondary: "#1ACFC9",
          accent: "#C3CDD5",
          neutral: "#191D24",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#1FBE02",
          warning: "#FBBD23",
          error: "#E74F3D",
          highlight: "#304555",
          title: "#848484",
        },
        extend: {},
      },
      "dark",
      "coffee",
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "mytheme",
  },
};
