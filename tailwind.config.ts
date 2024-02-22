import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      '2md': '896px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'form-title': '#043133',
        'form-label': '#4D5959',
        'enter-button': '#F5167E',
        'select-background': 'white',
        'select-text': 'black',
      },
    },
  },
  plugins: [],
  important: true,
};
export default config;
