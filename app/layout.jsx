import "./globals.css";
import Nav from "../components/Nav";
import AuthProvider from "../components/AuthProvider";


export const metadata = {
  title: "White Lotus",
  description: "Application desgined for White Lotus (Coursework)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <AuthProvider>
          <Nav />
          <div className="m-2 ">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
