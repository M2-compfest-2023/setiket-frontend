const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
        secondary: ['var(--font-atmospheric)', fontFamily.sans],
      },
      colors: {
        primary: {
          10: '#daeffc',
          20: '#b5dffa',
          30: '#8fd0f7',
          40: '#6ac0f5',
          50: '#45b0f2',
          60: '#378dc2',
          70: '#296a91',
          80: '#1c4661',
          90: '#0e2330',
        },
        danger: {
          10: '#facedd',
          20: '#f59ebb',
          30: '#ef6d98',
          40: '#ea3d76',
          50: '#e50c54',
          60: '#b70a43',
          70: '#890732',
          80: '#5c0522',
          90: '#2e0211',
        },
        warning: {
          10: '#fdf6cd',
          20: '#fbed9b',
          30: '#f9e36a',
          40: '#f7da38',
          50: '#f5d106',
          60: '#c4a705',
          70: '#937d04',
          80: '#625402',
          90: '#312a01',
        },
        success: {
          10: '#ccf5e0',
          20: '#99ebc2',
          30: '#66e0a3',
          40: '#33d685',
          50: '#00cc66',
          60: '#00a352',
          70: '#007a3d',
          80: '#005229',
          90: '#002914',
        },
        typo: {
          white: '#ffffff',
          surface: '#F9FAFB',
          light: '#F0F2F5',
          outline: '#E4E7EB',
          inline: '#D1D5DC',
          icon: '#9AA2B1',
          secondary: '#687083',
          label: '#1a3650',
          primary: '#212121',
        },
      },
      boxShadow: {
        20: '0px 0.5px 2px rgba(65, 78, 98, 0.12), 0px 0px 1px rgba(65, 78, 98, 0.05)',
        40: '0px 2px 4px rgba(65, 78, 98, 0.12), 0px 0px 1px rgba(65, 78, 98, 0.05)',
        60: '0px 4px 8px rgba(65, 78, 98, 0.12), 0px 0px 1px rgba(65, 78, 98, 0.05);',
        80: '0px 8px 16px rgba(65, 78, 98, 0.12), 0px 0px 1px rgba(65, 78, 98, 0.05);',
        100: '0px 16px 24px rgba(65, 78, 98, 0.12), 0px 0px 1px rgba(65, 78, 98, 0.05);',
      },
    },
  },

  plugins: [require('@tailwindcss/forms')],
};
