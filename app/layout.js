import "./globals.css";
import SessionWrapper from "@/component/SessionWrapper";

export const metadata = {
  title: "Echo-Post",
  description: "A Post Sharing Platfrom",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
        ></link>
        <SessionWrapper>{children}</SessionWrapper>
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/toastify-js"
        ></script>
      </body>
    </html>
  );
}
