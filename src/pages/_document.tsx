import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Winners Gold Hotel - Premium Accommodation in Techiman, Bono East" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
