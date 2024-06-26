/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customColor: '#E2B883',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
