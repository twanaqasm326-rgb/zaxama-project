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
        // FAKHAMA DECOR Warm Architectural Atelier Palette
        showroom: {
          alabaster: '#FAF8F5',       // Primary Light Warm Canvas
          travertine: '#F3EFEA',      // Soft Linen Travertine Card
          stone: '#EAE4DC',           // Elevated Warm Stone
          hairline: '#DFD9CE',        // 1px Precision Hairline
          hairlineDark: '#2C2723',    // Dark Chamber Hairline
          obsidian: '#12100E',        // Deep Obsidian Monolith
          charcoal: '#1E1B18',        // Smoked Charcoal Text
          umber: '#767067',           // Muted Umber Dimension Tags
          bronze: '#C5A059',          // Signature Champagne Brushed Gold
          burnished: '#A37F3C',       // Burnished Bronze Hover
          goldLight: '#E8D49E',       // Luminescent Gold Highlight
        },
        brand: {
          50: '#FDFBF7',
          100: '#FAF4EB',
          200: '#F3E8D3',
          300: '#E9D5B0',
          400: '#DCBD85',
          500: '#C5A059', // Signature Champagne Brushed Gold
          600: '#A37F3C',
          700: '#82622C',
          800: '#644A20',
          900: '#463316',
          950: '#281C0B',
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
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(30, 27, 24, 0.03), 0 1px 2px -1px rgba(30, 27, 24, 0.02)',
        'card': '0 6px 24px -4px rgba(30, 27, 24, 0.05), 0 2px 6px -1px rgba(30, 27, 24, 0.03)',
        'modal': '0 25px 60px -12px rgba(24, 22, 19, 0.22)',
        'drawer': '-12px 0 35px -5px rgba(24, 22, 19, 0.14)',
        'glow': '0 0 30px -4px rgba(197, 160, 89, 0.22)',
        'pedestal': '0 18px 45px -12px rgba(30, 27, 24, 0.06)',
        'monolith': '0 30px 60px -20px rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'radial-ambient': 'radial-gradient(ellipse at 50% 0%, rgba(197, 160, 89, 0.09) 0%, rgba(250, 248, 245, 0) 70%)',
        'radial-spotlight': 'radial-gradient(circle at 50% 30%, rgba(197, 160, 89, 0.18) 0%, rgba(18, 16, 14, 0) 65%)',
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
        },
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
