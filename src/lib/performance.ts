export const PerformanceMetrics = {
  marks: new Map<string, number>(),
  
  start(label: string) {
    if (typeof window !== "undefined" && performance) {
      performance.mark(`start-${label}`);
      this.marks.set(label, Date.now());
    }
  },
  
  end(label: string) {
    if (typeof window !== "undefined" && performance) {
      const startTime = this.marks.get(label);
      if (startTime) {
        performance.mark(`end-${label}`);
        performance.measure(label, `start-${label}`, `end-${label}`);
        this.marks.delete(label);
      }
    }
  },
  
  getMeasures() {
    if (typeof window === "undefined" || !performance) return [];
    
    const entries = performance.getEntriesByType("measure");
    return entries.map((entry) => ({
      name: entry.name,
      duration: entry.duration,
      startTime: entry.startTime,
    }));
  },
};

export function measureAsync<T>(
  label: string,
  fn: () => Promise<T>
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    PerformanceMetrics.start(label);
    try {
      const result = await fn();
      PerformanceMetrics.end(label);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

export function reportWebVitals(metric: { name: string; value: number; id: string }) {
  const body = {
    name: metric.name,
    value: metric.value,
    id: metric.id,
    rating: getRating(metric.name, metric.value),
  };

  if (process.env.NODE_ENV === "development") {
    console.log("[Web Vitals]", body);
  }

  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true") {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(() => {});
  }
}

function getRating(name: string, value: number): "good" | "needs-improvement" | "poor" {
  const thresholds: Record<string, { good: number; poor: number }> = {
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    FID: { good: 100, poor: 300 },
    INP: { good: 200, poor: 500 },
    LCP: { good: 2500, poor: 4000 },
    TTFB: { good: 800, poor: 1800 },
  };

  const threshold = thresholds[name];
  if (!threshold) return "good";
  
  if (value <= threshold.good) return "good";
  if (value <= threshold.poor) return "needs-improvement";
  return "poor";
}

export function trackError(error: Error, context?: Record<string, unknown>) {
  if (process.env.NODE_ENV === "development") {
    console.error("[Error Tracking]", { error: error.message, context });
  }

  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true") {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "error",
        message: error.message,
        stack: error.stack,
        context,
        timestamp: Date.now(),
      }),
    }).catch(() => {});
  }
}
