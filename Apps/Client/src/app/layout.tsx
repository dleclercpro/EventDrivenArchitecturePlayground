import type { Metadata } from 'next'
import CssBaseline from '@mui/material/CssBaseline';
import './fonts';

export const metadata: Metadata = {
  title: 'Dummy Online Shop',
  description: 'This is a prototypal online shop, meant to demonstrate the range of my full stack skills.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CssBaseline>
      <html lang='en'>
        <body>
          {children}
        </body>
      </html>
    </CssBaseline>
  )
}
