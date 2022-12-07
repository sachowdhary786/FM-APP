import type { AppProps } from "next/app"
import Layout from "../src/layout/layout"

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout children={undefined} >
            <Component {...pageProps} />
        </Layout>
    )
}