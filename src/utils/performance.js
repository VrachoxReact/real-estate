export const measurePerformance = () => {
  if ("performance" in window) {
    window.addEventListener("load", () => {
      const paint = performance.getEntriesByType("paint");
      const navigation = performance.getEntriesByType("navigation")[0];

      console.log("First Paint:", paint[0].startTime);
      console.log("First Contentful Paint:", paint[1].startTime);
      console.log("DOM Interactive:", navigation.domInteractive);
      console.log("DOM Complete:", navigation.domComplete);
    });
  }
};
