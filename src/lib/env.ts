export interface EnvConfig {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

const requiredVars = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];

export function validateEnvironment(): EnvConfig {
  const config: EnvConfig = {
    isValid: true,
    errors: [],
    warnings: [],
  };

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      config.errors.push(`Missing required environment variable: ${varName}`);
      config.isValid = false;
    }
  }

  if (process.env.NODE_ENV === "production") {
    if (!process.env.NEXT_PUBLIC_SENTRY_DSN && process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true") {
      config.warnings.push(
        "Analytics is enabled but Sentry DSN is not configured. Consider adding error tracking."
      );
    }

    if (process.env.NEXT_PUBLIC_ADMIN_PASSWORD === "admin123") {
      config.warnings.push(
        "Default admin password is in use. Please change it in production."
      );
    }

    if (process.env.NEXT_PUBLIC_SITE_URL?.includes("localhost")) {
      config.warnings.push(
        "Site URL is set to localhost. This may cause issues in production."
      );
    }
  }

  return config;
}

export function getEnvironmentInfo() {
  return {
    nodeEnv: process.env.NODE_ENV || "development",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "not set",
    supabaseConfigured: !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ),
    analyticsEnabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
    timestamp: new Date().toISOString(),
  };
}
