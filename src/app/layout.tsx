import { Roboto } from "next/font/google";
import CustomThemeProvider from "./theme-provider";
import "./globals.css";
import SessionWrapper from './component/SessionWrapper';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

interface MetadataProps {
  title: string;
  description: string;
}

export const metadata: MetadataProps = {
  title: "Scription",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="stylesheet" {...roboto} />
      </head>
      <body>
        <SessionWrapper>
          <CustomThemeProvider>
            {children}
          </CustomThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
