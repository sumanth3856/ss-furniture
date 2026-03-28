import { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/lib/data";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));
  
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | SS Furniture`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | SS Furniture`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
