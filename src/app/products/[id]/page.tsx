"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Check, Loader2, Truck, Shield, RefreshCw, Star, Minus, Plus, XCircle, CheckCircle2, ZoomIn, ZoomOut, ArrowRight, Sparkles, Package, Clock, Award, ChevronRight, Share2, Eye, EyeOff } from "lucide-react";
import { products as staticProducts, type Product } from "@/lib/data";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import { useToast } from "@/components/Toast";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";

const highlights = [
  { icon: Award, title: "Premium Quality", desc: "Handcrafted with finest materials" },
  { icon: Truck, title: "Free Delivery", desc: "On orders above ₹15,000" },
  { icon: Shield, title: "10-Year Warranty", desc: "Full coverage included" },
  { icon: RefreshCw, title: "Easy Returns", desc: "30-day hassle-free" },
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [copied, setCopied] = useState(false);
  
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
        
        const allRes = await fetch("/api/products?limit=100");
        const allData = await allRes.json();
        const allProducts = allData.data || [];
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center shadow-lg shadow-gray-900/25">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
          <p className="text-gray-500 font-medium">Loading product...</p>
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Product Not Found</h1>
          <p className="text-gray-500 mb-8">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold rounded-full hover:shadow-lg hover:shadow-gray-900/25 transition-all">
            Browse Products <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
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
    showToast(isWishlisted ? "Removed from wishlist" : "Added to wishlist", "info");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    showToast("Link copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const images = [product.image];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* HEADER */}
      <section className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Breadcrumbs />
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* IMAGE GALLERY */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div 
                className={`relative aspect-square rounded-2xl lg:rounded-3xl overflow-hidden bg-gray-100 cursor-zoom-in group ${isOutOfStock ? "grayscale opacity-75" : ""}`}
                onClick={() => !isOutOfStock && setIsZoomed(!isZoomed)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { setZoomPosition({ x: 50, y: 50 }); setIsZoomed(false); }}
              >
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-cover transition-all duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  } ${isZoomed ? "scale-150" : "group-hover:scale-105"}`}
                  style={isZoomed ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` } : undefined}
                  onLoad={() => setImageLoaded(true)}
                />
                
                {/* Zoom indicator */}
                {!isOutOfStock && !isZoomed && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-black/50 backdrop-blur-sm rounded-lg text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4" />
                    <span>Hover to zoom</span>
                  </div>
                )}
                
                {/* Zoom button */}
                {!isOutOfStock && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomed(!isZoomed);
                    }}
                    className="absolute top-4 right-4 p-3 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white transition-all shadow-lg opacity-0 group-hover:opacity-100"
                    aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                  >
                    {isZoomed ? <ZoomOut className="w-5 h-5 text-gray-700" /> : <ZoomIn className="w-5 h-5 text-gray-700" />}
                  </button>
                )}
                
                {/* Out of stock overlay */}
                {isOutOfStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="bg-white px-8 py-6 rounded-2xl flex flex-col items-center shadow-2xl">
                      <XCircle className="w-10 h-10 text-red-500 mb-3" />
                      <span className="font-bold text-gray-900 text-lg">Out of Stock</span>
                      <span className="text-sm text-gray-500 mt-1">Currently unavailable</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 transition-all ${
                      selectedImage === idx
                        ? "ring-2 ring-amber-500 ring-offset-2 shadow-lg"
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
            </motion.div>

            {/* PRODUCT INFO */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col"
            >
              {/* Breadcrumb & Actions */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider">
                  {product.category}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    title="Share"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4 text-gray-600" />}
                  </button>
                  <button
                    onClick={handleToggleWishlist}
                    className={`p-2 rounded-lg transition-colors ${
                      isWishlisted ? "bg-red-50 text-red-500" : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                  </button>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Stock */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 4 ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(128 reviews)</span>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full ${
                  isOutOfStock 
                    ? "bg-red-100 text-red-700" 
                    : "bg-green-100 text-green-700"
                }`}>
                  {isOutOfStock ? (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      Out of Stock
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      In Stock
                    </>
                  )}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {isOutOfStock && (
                  <span className="text-sm text-red-500 font-medium">Currently unavailable</span>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className={`text-gray-600 leading-relaxed ${!showFullDesc && 'line-clamp-3'}`}>
                  {product.description}
                </p>
                {product.description && product.description.length > 150 && (
                  <button
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="text-amber-600 text-sm font-medium hover:text-amber-700 mt-2 flex items-center gap-1"
                  >
                    {showFullDesc ? (
                      <>
                        Show less <EyeOff className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Read more <Eye className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Highlights */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-100 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  {highlights.map((highlight) => (
                    <div key={highlight.title} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center shadow-lg shadow-gray-900/25 shrink-0">
                        <highlight.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{highlight.title}</p>
                        <p className="text-xs text-gray-500">{highlight.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              {!isOutOfStock && (
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                  <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-50 transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="w-14 text-center font-bold text-gray-900 text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-50 transition-colors"
                      aria-label="Increase"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <div className="flex gap-3 mb-8">
                {isOutOfStock ? (
                  <button
                    disabled
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 font-bold rounded-2xl bg-gray-100 text-gray-400 cursor-not-allowed"
                  >
                    <XCircle className="w-5 h-5" />
                    Out of Stock
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-bold rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed shadow-lg ${
                      isInCart
                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                        : "bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700"
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
              </div>

              {/* Trust Banner */}
              <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Truck className="w-6 h-6 text-amber-400" />
                    </div>
                    <p className="text-white font-semibold text-xs sm:text-sm">Free Delivery</p>
                    <p className="text-gray-400 text-[10px] sm:text-xs mt-1">Orders over ₹15,000</p>
                  </div>
                  <div className="text-center border-x border-gray-700">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-6 h-6 text-amber-400" />
                    </div>
                    <p className="text-white font-semibold text-xs sm:text-sm">10-Year Warranty</p>
                    <p className="text-gray-400 text-[10px] sm:text-xs mt-1">Full coverage</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <RefreshCw className="w-6 h-6 text-amber-400" />
                    </div>
                    <p className="text-white font-semibold text-xs sm:text-sm">Easy Returns</p>
                    <p className="text-gray-400 text-[10px] sm:text-xs mt-1">30-day policy</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full mb-3">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">For You</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">You May Also Like</h2>
              </div>
              <Link href="/products" className="hidden sm:flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors">
                View All <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 rounded-full mb-4">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400">Need Help?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Have Questions?</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">Our design consultants are here to help you find the perfect pieces for your space.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold rounded-full hover:shadow-lg hover:shadow-gray-900/25 transition-all">
            Contact Us <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
