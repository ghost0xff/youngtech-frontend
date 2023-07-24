export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
    <html lang="en" className={roboto.variable}>
      <body className={roboto.className}>
        <ThemeRegistry>
		{children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
