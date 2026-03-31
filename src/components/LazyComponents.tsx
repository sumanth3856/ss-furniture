"use client";

import { Suspense, lazy, ReactElement, ReactNode } from "react";

interface LazyWrapperProps {
  children?: ReactNode;
  fallback?: ReactElement | null;
  LazyComponent: React.LazyExoticComponent<React.ComponentType<unknown>>;
}

function DefaultFallback() {
  return (
    <div className="animate-pulse bg-gray-100 rounded-lg w-full h-full min-h-[200px]" />
  );
}

export function LazyWrapper(props: LazyWrapperProps) {
  const { LazyComponent, fallback } = props;
  return (
    <Suspense fallback={fallback ?? <DefaultFallback />}>
      <LazyComponent />
    </Suspense>
  );
}

export const LazyTestimonials = lazy(() => import("./Testimonials"));
export const LazyFAQ = lazy(() => import("./FAQ"));
