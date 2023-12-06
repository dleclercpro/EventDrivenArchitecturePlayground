import type { Metadata } from 'next'
import CssBaseline from '@mui/material/CssBaseline';
import './fonts';

export const metadata: Metadata = {
  title: 'Dummy Online Shop',
  description: '...',
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
