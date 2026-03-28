import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our complete collection of premium furniture including sofas, tables, chairs, bedroom sets, and lighting. Filter by category, price, and more.",
  openGraph: {
    title: "Products | SS Furniture",
    description: "Browse our complete collection of premium furniture.",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
