module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Poppins',
    },
    container: {
      padding: {
        DEFAULT: '30px',
        lg: '0',
      },
    },
    screens: {
      'sm': '400px',
      'md': '600px',
      'lg': '800px',
      'xlg': '900px',
      'xl': '1024px',
    },
    extend: {
      fontFamily: {
        lobster: ["Lobster", 'sans-serif'],
        jost: ["Jost", 'sans-serif'],
        play: ["Playfair Display", "serif"]
      },
      colors: {
        primary: '#222222',
        secondary: '#F5E6E0',
      },
      backgroundImage: {
        hero: "url('./img/bg_hero.svg')",
        box: "url('./img/box.png')",
      },
    },
  },
  plugins: [],
};
