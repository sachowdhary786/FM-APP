import { Html, Head, Main, NextScript } from 'next/document';
import dotenv from 'dotenv-safe';
dotenv.config({ silent: true, allowEmptyValues: true });

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}