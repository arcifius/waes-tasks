import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { reset } from 'styles/common';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <html lang="en-US">
                <Head>
                    <link rel="stylesheet" href="/_next/static/style.css" />
                    <style>{reset}</style>
                    <script
                        defer
                        src="https://use.fontawesome.com/releases/v5.0.13/js/all.js"
                        integrity="sha384-xymdQtn1n3lH2wcu0qhcdaOpQwyoarkgLVxC/wZ5q7h9gHtxICrpcaSUfygqZGOe"
                        crossOrigin="anonymous"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
