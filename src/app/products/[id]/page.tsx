"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Heart, ShoppingCart, Check, Loader2,
  Truck, Shield, RefreshCw, ZoomIn, Star, Minus, Plus, XCircle, CheckCircle2
} from "lucide-react";
import { products as staticProducts, type Product } from "@/lib/data";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import { useToast } from "@/components/Toast";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  const { addItem: addToCart, items } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) {
          setProduct(null);
          return;
        }
        const data = await res.json();
        setProduct(data);
        
        const allRes = await fetch("/api/products");
        const allProducts = await allRes.json();
        const related = allProducts
          .filter((p: Product) => p.category === data.category && p.id !== data.id)
          .slice(0, 4);
        setRelatedProducts(related);
      } catch {
        const fallback = staticProducts.find((p) => p.id === productId);
        setProduct(fallback || null);
        if (fallback) {
          const related = staticProducts
            .filter((p) => p.category === fallback.category && p.id !== fallback.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } finally {
        setIsLoading(false);
      }
    }
    
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C9A96E]" />
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const isWishlisted = isInWishlist(product.id);
  const cartItem = items.find((item) => item.product_id === product.id);
  const isInCart = !!cartItem;
  const isOutOfStock = product.in_stock === false;

  const handleAddToCart = async () => {
    if (isAdding || isOutOfStock) return;
    
    setIsAdding(true);
    
    try {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      showToast(`${quantity > 1 ? `${quantity} x ` : ""}${product.name} added to cart`, "success");
    } catch {
      showToast("Failed to add to cart", "error");
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleWishlist = () => {
    toggleItem(product);
    showToast(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      "info"
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const images = [product.image];

  return (
    <div className="min-h-screen">
      <section className="py-6 px-6 bg-[#FAFAFA] border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs />
        </div>
      </section>

      <section className="py-8 md:py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="space-y-4">
              <div 
                className={`relative aspect-square rounded-2xl overflow-hidden bg-gray-100 cursor-zoom-in ${isOutOfStock ? "grayscale opacity-75" : ""}`}
                onClick={() => setIsZoomed(!isZoomed)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setZoomPosition({ x: 50, y: 50 })}
              >
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover transition-all duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  } ${isZoomed ? "scale-150" : ""}`}
                  style={
                    isZoomed
                      ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                      : undefined
                  }
                  onLoad={() => setImageLoaded(true)}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                  aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                >
                  <ZoomIn className="w-5 h-5 text-[#6B6B6B]" />
                </button>
                
                {isOutOfStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white px-6 py-3 rounded-xl flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span className="font-medium text-gray-900">Out of Stock</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 transition-all ${
                      selectedImage === idx
                        ? "ring-2 ring-[#C9A96E] ring-offset-2"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-[#C9A96E] uppercase tracking-wider">
                  {product.category}
                </span>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full flex items-center gap-1 ${
                  isOutOfStock 
                    ? "bg-red-100 text-red-600" 
                    : "bg-green-100 text-green-600"
                }`}>
                  {isOutOfStock ? (
                    <>
                      <XCircle className="w-3 h-3" />
                      Out of Stock
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
                      In Stock
                    </>
                  )}
                </span>
              </div>
              
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? "text-[#C9A96E] fill-[#C9A96E]" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-[#6B6B6B]">(128 reviews)</span>
              </div>

              <p className="text-3xl font-bold text-[#1A1A1A] mb-2">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
              {isOutOfStock && (
                <p className="text-sm text-red-500 mb-4">This item is currently unavailable</p>
              )}

              <p className="text-[#6B6B6B] leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-[#1A1A1A]">Features:</h3>
                <ul className="space-y-2 text-sm text-[#6B6B6B]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C9A96E]" />
                    Premium materials and expert craftsmanship
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C9A96E]" />
                    10-year manufacturer warranty included
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C9A96E]" />
                    Free white-glove delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C9A96E]" />
                    30-day hassle-free returns
                  </li>
                </ul>
              </div>

              {!isOutOfStock && (
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-sm font-medium text-[#1A1A1A]">Quantity:</span>
                  <div className="flex items-center border border-black/10 rounded-full">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100 rounded-l-full transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-100 rounded-r-full transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {isOutOfStock ? (
                  <button
                    disabled
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium rounded-full bg-gray-200 text-gray-500 cursor-not-allowed"
                  >
                    <XCircle className="w-5 h-5" />
                    Out of Stock
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 disabled:cursor-not-allowed ${
                      isInCart
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-[#1A1A1A] text-white hover:bg-[#2C2C2C]"
                    }`}
                  >
                    {isAdding ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Adding...
                      </>
                    ) : isInCart ? (
                      <>
                        <Check className="w-5 h-5" />
                        Added to Cart {cartItem && cartItem.quantity > 1 && `(${cartItem.quantity})`}
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                )}
                <button
                  onClick={handleToggleWishlist}
                  className={`p-4 rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 ${
                    isWishlisted
                      ? "border-red-500 text-red-500 bg-red-50"
                      : "border-black/10 hover:border-red-500 hover:text-red-500"
                  }`}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-[#FAFAFA] rounded-2xl">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#C9A96E]" />
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">Free Delivery</p>
                    <p className="text-xs text-[#6B6B6B]">Orders over ₹15,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#C9A96E]" />
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">10 Year Warranty</p>
                    <p className="text-xs text-[#6B6B6B]">Full coverage</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-[#C9A96E]" />
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">Easy Returns</p>
                    <p className="text-xs text-[#6B6B6B]">30-day policy</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
