// Reads Sanity project connection details from environment variables.
// Deliberately does NOT throw when unset — the rest of the app must keep
// working (falling back to the existing static content in lib/) until a
// real Sanity project is created and these are configured. See
// sanity/README.md for setup steps.

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || '';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

export const isSanityConfigured = Boolean(projectId && dataset);
