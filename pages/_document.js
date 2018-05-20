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
                    <style>{reset}</style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
