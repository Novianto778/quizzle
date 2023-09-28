/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            container: {
                center: true,
                padding: '1rem',
            },
            colors: {
                primary: 'var(--clr-primary)',
                secondary: 'var(--clr-secondary)',
                body: 'var(--clr-body)',
                'body-light': 'var(--clr-body-light)',
            },
            height: {
                content: 'calc(100vh - 70px)',
                quiz: 'calc(100vh - 70px - 2rem)',
            },
            minHeight: {
                content: 'calc(100vh - 70px)',
            },
        },
    },
    plugins: [require('tailwind-scrollbar')],
};
