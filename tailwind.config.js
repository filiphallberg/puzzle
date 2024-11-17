const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/*.tsx"],
  theme: {
    extend: {
      fontSize: {
        dynamic: "50cqw",
      },
      size: {
        em: "1em",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".container-inline": {
          "container-type": "inline-size;",
        },
      });
    }),
  ],
};
