/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0b304a',
      },
      gridTemplateColumns: {
        // خلي الاسم يكون واضح
        'auto-fill-200': 'repeat(auto-fill, minmax(200px, 1fr))',
      }
    },
  },
  plugins: [],
}
