const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-space-grotesk)'],
      },
    },
  },
}


export default config;
