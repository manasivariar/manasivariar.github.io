export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      // keep everything below 951px as “mobile"
      md: '951px',
      // you can leave lg, xl, etc. as-is
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      animation: {
        'bounce': 'bounce 2s infinite',
        'slide-in': 'slide-in 0.4s ease-out'
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'slide-in': {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [
    function({ addVariant }) {
      // only apply on devices that support hover + fine pointer (i.e. mouse)
      addVariant('hoverable', '@media (hover: hover) and (pointer: fine)')
    }
  ]
}