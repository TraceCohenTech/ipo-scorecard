import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "-apple-system", "BlinkMacSystemFont", "SF Pro Text", "Inter", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "SF Mono", "Menlo", "monospace"],
      },
      colors: {
        gray: {
          100: '#0a0a0a',
          200: '#111111',
          300: '#171717',
          400: '#222222',
          500: '#333333',
          600: '#444444',
          700: '#666666',
          800: '#999999',
          900: '#cccccc',
          1000: '#eeeeee',
        },
      },
      letterSpacing: {
        'heading-xl': '-0.04em',
        'heading-lg': '-0.03em',
        'heading-md': '-0.02em',
      },
      transitionTimingFunction: {
        'geist': 'cubic-bezier(0.175, 0.885, 0.32, 1.1)',
      },
      boxShadow: {
        'card': '0 1px 2px rgba(255, 255, 255, 0.03)',
        'popover': '0 1px 1px rgba(255,255,255,0.02), 0 4px 8px -4px rgba(0,0,0,0.3), 0 16px 24px -8px rgba(0,0,0,0.3)',
        'modal': '0 1px 1px rgba(255,255,255,0.02), 0 8px 16px -4px rgba(0,0,0,0.4), 0 24px 32px -8px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};
export default config;
