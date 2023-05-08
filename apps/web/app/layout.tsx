import { BASE_URL, BRAND_DESCRIPTION, BRAND_NAME } from "@pokemon/configuration";
import { ButtonLink, PokeBalls, ThemeProvider, ThemeToggle } from "@pokemon/ui";
import { Home } from "lucide-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
          <div className="dark:bg-gray-1 h-full bg-white">
            <header className="absolute inset-x-0 top-0 z-50 py-5">
              <nav className="mx-auto flex max-w-2xl items-center justify-between gap-x-6" aria-label="Global">
                <div className="flex lg:flex-1">
                  <ButtonLink
                    href="/"
                    variant="ghost"
                    className="group flex h-7 w-7 items-center justify-center rounded-md p-0 transition"
                    aria-label="Go home"
                  >
                    <Home className="text-slate-11 group-hover:text-slate-12 absolute h-4 w-4" />
                  </ButtonLink>
                </div>

                <div className="flex flex-1 items-center justify-end gap-x-6">
                  <ThemeToggle />
                </div>
              </nav>
            </header>
            <main className="mx-auto grid h-full max-w-2xl grid-rows-[max-content_minmax(0px,_1fr)_max-content] gap-4 pb-4 pt-16">
              {modal}
              {children}
              <PokeBalls />
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
