import type { Metadata, Viewport } from 'next';
import { Syne, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { CustomCursor } from '@/components/ui/custom-cursor';
import { BackgroundMusicPlayer } from '@/components/audio/BackgroundMusicPlayer';

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Faahem Tayyeb — Computer Engineering × AI',
  description:
    'Faahem Tayyeb is a Computer Engineering student at FAST-NUCES exploring artificial intelligence, embedded systems, computer vision, digital twins and intelligent systems.',
  openGraph: {
    title: 'Faahem Tayyeb — Computer Engineering × AI',
    description:
      'Computer Engineering student at FAST-NUCES exploring the intersection of AI, Embedded Systems, Computer Vision, and Digital Twins.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Faahem Tayyeb Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Faahem Tayyeb — Computer Engineering × AI',
    description:
      'Computer Engineering student at FAST-NUCES exploring artificial intelligence, embedded systems, computer vision, digital twins and intelligent systems.',
  },
};

export const viewport: Viewport = {
  themeColor: '#060606',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <body className="bg-[#060606] text-[#F4F4F0] antialiased selection:bg-[#E1E0CC] selection:text-[#060606] min-h-screen">
        <CustomCursor />
        {children}
        <BackgroundMusicPlayer />
      </body>
    </html>
  );
}
