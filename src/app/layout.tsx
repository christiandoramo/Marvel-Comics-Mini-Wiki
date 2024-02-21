import './globals.css'
import type { Metadata } from 'next'
import ThemeRegistry from './themes/ThemeRegistry'
import { CharactersProvider } from './hooks/characters'



export const metadata: Metadata = {
  title: 'Marvel Comics Characters Mini wiki',
  description: 'Search for characters and them informations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeRegistry>
          <CharactersProvider>
            {children}
          </CharactersProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
