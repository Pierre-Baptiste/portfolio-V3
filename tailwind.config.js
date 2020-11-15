module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        action: "#001aff",
        paper: "#F2F2F2",
        lightgray: "#808080",
        smoke: "rgba(0, 0, 0, 0.5)",
      },
      width: {
        72: "18rem",
      },
      height: {
        80: "20rem",
        96: "24rem",
        112: "28rem",
        128: "32rem",
        144: "36rem",
        160: "40rem",
      },
      maxWidth: {
        container: "97rem",
      },
    },
  },
  variants: {},
  plugins: [],
};
