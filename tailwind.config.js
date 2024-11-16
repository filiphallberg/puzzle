const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/*.tsx"],
  theme: {
    extend: {
      fontSize: {
        dynamic: "50cqw",
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
