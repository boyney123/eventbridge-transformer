module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    safelist: [
      'border-blue-500',
      'bg-blue-500',
      'shadow-blue-800/60',
      'border-indigo-500',
      'bg-indigo-500',
      'shadow-indigo-800/60',
      'border-pink-500',
      'bg-pink-500',
      'shadow-pink-800/60',
      'border-green-500',
      'bg-green-500',
      'shadow-green-800/60'
    ],
  },
}
