import './globals.css'

export const metadata = {
    title: 'Lipedema Dashboard | IbsenSykehusene',
    description: 'Interaktivt dashboard for lipedema-studie ved IbsenSykehusene (2021-2025)',
}

export default function RootLayout({ children }) {
    return (
          <html lang="no">
            <body>{children}</body>
      </html>
    )
}
