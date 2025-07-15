import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FFSM Resizable - React Component Library',
  description: 'A powerful React component library for creating resizable panels with beautiful grip styles and smooth interactions.',
  keywords: ['react', 'resizable', 'panels', 'component', 'library', 'typescript', 'ui'],
  authors: [{ name: 'FFSM' }],
  openGraph: {
    title: 'FFSM Resizable - React Component Library',
    description: 'A powerful React component library for creating resizable panels with beautiful grip styles and smooth interactions.',
    type: 'website',
    url: 'https://ffsmio-resizable.vercel.app',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FFSM Resizable Preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FFSM Resizable - React Component Library',
    description: 'A powerful React component library for creating resizable panels with beautiful grip styles and smooth interactions.',
    images: ['/og-image.png']
  }
};
