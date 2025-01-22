import "@/app/globals.css"; // Import global styles
import ClientLayout from "@/components/ClientLayout";
import { CartProvider } from "@/context/CartContext"; // Import the CartProvider

export const metadata = {
  title: "My Store",
  description: "Your go-to tech store.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

