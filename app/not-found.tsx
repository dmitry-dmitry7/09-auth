import type { Metadata } from 'next';
import css from './Home.module.css';

export const metadata: Metadata = {
  title: 'Not found',
  description: 'Such page does not exist',
  openGraph: {
    title: 'Not found',
    description: 'Such page does not exist.',
    url: 'http://localhost:3000',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Og Image Alt',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
