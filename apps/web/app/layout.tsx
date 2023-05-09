import { BASE_URL, BRAND_DESCRIPTION, BRAND_NAME } from "@pokemon/configuration";
import { PokeBalls, ThemeProvider } from "@pokemon/ui";
import { Header } from "@pokemon/ui/server";
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
            {/* @ts-expect-error Server component */}
            <Header />
            <main className="mx-auto flex h-full max-w-2xl flex-col gap-4 pb-4 pt-16">
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
  metadataBase: new URL(BASE_URL),
  authors: [
    {
      name: "Amos Bastian",
      url: "https://amosbastian.com",
    },
  ],
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "Drizzle ORM",
    "Server Actions",
    "Parallel Routes",
    "shadcn UI",
  ],
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
    creator: "@amosbastian",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${BASE_URL}/site.webmanifest`,
};
