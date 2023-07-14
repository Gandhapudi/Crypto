/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {extend: {
    animation: {
      'bounce': 'wiggle 1s linear infinite',
      'colorbind':"colorbind 3s linear infinite"
    },
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'translateY(-5px)' },
        '50%': { transform: 'translateY(5px)' },
      },
      colorbind: {
        '0%, 100%': { color:"black" },
        '50%': { color:"#ddb65c" },
      }
    },
    screens: {
      'mobile':'300px',
      'sm': '470px',
      
      "md":"700px",

      'laptop': '1024px',
     

      'desktop': '1280px'
    }
  },
  plugins: [],
}
}