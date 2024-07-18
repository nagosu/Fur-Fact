/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretend'],
      },
      colors: {
        primary: '#40A5FD',
      },
      backgroundImage: {
        'Dog': "url('/src/assets/Dog.jpg')",
      }
    },
  },
  plugins: [],
}
