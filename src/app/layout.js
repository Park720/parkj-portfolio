import './globals.css';

export const metadata = {
  title: 'Junhyung Park — Game Dev & Web Dev',
  description: 'Portfolio of Junhyung Park, Game Development student at Purdue University.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
