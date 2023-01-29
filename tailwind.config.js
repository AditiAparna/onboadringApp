module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          '0%, 100%': {transform: 'scale(1)'},
          '50%': {transform: 'scale(1.5)'},
        },
      },
      animation: {
        pulse: 'pulse 1s east-in-out infinite',
      },
    },
  },
  plugins: [],
};
