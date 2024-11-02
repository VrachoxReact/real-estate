export const optimizeImage = (url, options = {}) => {
  const { width = 800, quality = 80, format = "webp", blur = false } = options;

  if (url.includes("unsplash.com")) {
    const params = [
      `w=${width}`,
      `q=${quality}`,
      "auto=format",
      format === "webp" ? "fm=webp" : "",
      blur ? "blur=200" : "",
    ]
      .filter(Boolean)
      .join("&");

    return `${url}?${params}`;
  }

  return url;
};

export const generateBlurHash = (url) => {
  if (url.includes("unsplash.com")) {
    return `${url}?w=20&blur=100`;
  }
  return url;
};
