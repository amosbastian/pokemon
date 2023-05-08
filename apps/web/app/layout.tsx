import { BASE_URL, BRAND_DESCRIPTION, BRAND_NAME } from "@pokemon/configuration";
import { ThemeProvider, ThemeToggle } from "@pokemon/ui";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./styles.css";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    // Note! If you do not add suppressHydrationWarning to your <html> you will get warnings
    // because next-themes updates that element. This property only applies one level deep,
    // so it won't block hydration warnings on other elements.
    <html
      lang="en"
      className={`text-slate-12 flex h-full min-h-screen flex-col antialiased ${inter.className}`}
      suppressHydrationWarning
    >
      <body className="h-full">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="h-full bg-white dark:bg-zinc-900">
            <header>
              <nav className="mx-auto flex max-w-2xl items-center justify-between gap-x-6 py-6" aria-label="Global">
                <div className="flex lg:flex-1">
                  <Link href="/" className="-m-1.5 p-1.5">
                    Pokemon
                  </Link>
                </div>

                <div className="flex flex-1 items-center justify-end gap-x-6">
                  <ThemeToggle />
                </div>
              </nav>
            </header>
            <main className="mx-auto max-w-2xl py-8">
              {modal}
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: BRAND_NAME,
    template: `%s | ${BRAND_NAME}`,
  },
  description: BRAND_DESCRIPTION,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    title: BRAND_NAME,
    description: BRAND_DESCRIPTION,
    url: BASE_URL,
    siteName: BRAND_NAME,
    images: [
      {
        url: `${BASE_URL}/og.jpg`,
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: BRAND_NAME,
    description: BRAND_DESCRIPTION,
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
};
