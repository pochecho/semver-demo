export function initializeApp() {
  return () => {
    return new Promise<void>((resolve, reject) => {
      resolve();
    });
  };
}
