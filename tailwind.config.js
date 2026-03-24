/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg':           'var(--color-bg)',
        'bg-alt':       'var(--color-bg-alt)',
        'bg-dark':      'var(--color-bg-dark)',
        'ink':          'var(--color-ink)',
        'ink-2':        'var(--color-ink-2)',
        'accent':       'var(--color-accent)',
        'accent-2':     'var(--color-accent-2)',
        'accent-3':     'var(--color-accent-3)',
      },
      fontFamily: {
        heading: 'var(--font-heading)',
        body:    'var(--font-body)',
      },
    },
  },
  plugins: [],
}
