// tailwind.config.mjs
import relumeTailwindPreset from "@relume_io/relume-tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [relumeTailwindPreset],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      colors: {
        // Your brand colors from style guide
        'brand-main': '#4F758D',      // Smalt Blue (Main)
        'brand-green': '#01B09A',     // Persian Green
        'brand-red': '#FF6B6B',       // Bittersweet
        'brand-cream': '#F3E9DF',     // Merino
        'brand-light-blue': '#A2D2E2', // Regent St Blue
        
        // Map to semantic colors for easier use
        primary: {
          DEFAULT: '#4F758D', // Smalt Blue
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#A2D2E2', // Regent St Blue
          foreground: '#000000',
        },
        accent: {
          DEFAULT: '#01B09A', // Persian Green
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#FF6B6B', // Bittersweet
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F3E9DF', // Merino
          foreground: '#4F758D',
        },
        
        // Keep existing system colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsla(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        success: '#01B09A', // Using Persian Green for success
        error: '#FF6B6B',    // Using Bittersweet for error
        warning: 'hsl(var(--warning))',
      },
      fontFamily: {
        // Your brand fonts from style guide
        sans: ['Nunito Sans', 'system-ui', 'sans-serif'], // Heading font
        body: ['Quicksand', 'system-ui', 'sans-serif'],    // Body font
        
        // Keep existing mono font
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--text)',
            '--tw-prose-headings': 'var(--text)',
            fontFamily: theme('fontFamily.body').join(', '),
            h1: {
              fontFamily: theme('fontFamily.sans').join(', '),
              fontSize: '3.5rem',
              fontWeight: '600', // Medium weight as specified
              marginBottom: '0.25em',
            },
            h2: {
              fontFamily: theme('fontFamily.sans').join(', '),
              fontWeight: '600',
            },
            h3: {
              fontFamily: theme('fontFamily.sans').join(', '),
              fontWeight: '600',
            },
            h4: {
              fontFamily: theme('fontFamily.sans').join(', '),
              fontWeight: '600',
            },
            h5: {
              fontFamily: theme('fontFamily.sans').join(', '),
              fontWeight: '600',
            },
            h6: {
              fontFamily: theme('fontFamily.sans').join(', '),
              fontWeight: '600',
            },
            p: {
              fontFamily: theme('fontFamily.body').join(', '),
              fontWeight: '500', // Regular-medium as specified
            },
          },
        },
      }),
    },
  },
}