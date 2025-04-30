export const getApiBaseUrl = () => {
    return (
      import.meta.env.VITE_API_BASE_URL ||
      `${window.location.protocol}//${window.location.hostname}:${import.meta.env.VITE_API_FALLBACK_PORT || 3000}`
    );
  };
  