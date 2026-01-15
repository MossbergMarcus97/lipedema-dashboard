import './globals.css'

export const metadata = {
    title: 'State of Lipedema 2026',
    description: 'Interaktivt dashboard for lipedema-studie ved IbsenSykehusene (2021-2025)',
}

export default function RootLayout({ children }) {
    return (
          <html lang="no">
            <body>{children}</body>
      </html>
    )
}
