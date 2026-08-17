/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // FAKHAMA DECOR Royal Contemporary Environmental Palettes
        showroom: {
          slate: '#0D121B',          // Primary Midnight Slate Atmosphere
          card: '#141B27',           // Tailored Midnight Card Surface
          surface: '#1E2737',        // Elevated Slate Surface
          hairline: '#263346',       // Subtle Structural Hairline
          obsidian: '#080B10',       // Deepest Obsidian Chamber
          charcoal: '#111722',       // Dark Midnight Charcoal
          brass: '#D4AF37',          // Signature Royal Brushed Brass
          burnished: '#B89228',      // Burnished Brass Accent
          gold: '#E5C158',           // Bright Gold Specular
          muted: '#94A3B8',          // Soft Ice Slate
        },
        brand: {
          50: '#FDFBF0',
          100: '#FAF4DC',
          200: '#F4E7B2',
          300: '#ECD581',
          400: '#E2C055',
          500: '#D4AF37', // Signature Royal Brushed Brass
          600: '#B89228',
          700: '#926F1D',
          800: '#6E5016',
          900: '#4A340E',
          950: '#2B1E06',
        },
        stone: {
          50: '#F1F5F9',
          100: '#E2E8F0',
          200: '#CBD5E1',
          300: '#94A3B8',
          400: '#64748B',
          500: '#475569',
          600: '#334155',
          700: '#1E293B',
          800: '#141B27',
          900: '#0D121B', // Deep Midnight Slate
          950: '#080B10',
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(28, 25, 23, 0.06), 0 2px 6px -1px rgba(28, 25, 23, 0.03)',
        'modal': '0 25px 50px -12px rgba(28, 25, 23, 0.18)',
        'drawer': '-10px 0 30px -5px rgba(28, 25, 23, 0.12)',
        'glow': '0 0 35px -5px rgba(184, 147, 88, 0.25)',
        'pedestal': '0 20px 40px -15px rgba(24, 22, 20, 0.08)',
        'monolith': '0 30px 60px -20px rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        'radial-ambient': 'radial-gradient(circle at 50% 0%, rgba(184, 147, 88, 0.08) 0%, rgba(250, 248, 245, 0) 70%)',
        'radial-spotlight': 'radial-gradient(circle at 50% 30%, rgba(184, 147, 88, 0.15) 0%, rgba(24, 22, 20, 0) 65%)',
        'hairline-grid': 'linear-gradient(to right, rgba(226, 221, 213, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(226, 221, 213, 0.4) 1px, transparent 1px)',
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        }
      },
      animation: {
        "fade-in": "fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slide-in-right 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-subtle": "pulse-subtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
}
