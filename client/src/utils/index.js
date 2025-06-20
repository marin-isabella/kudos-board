export const getUrl = () => {
    let base_url;
    if (import.meta.env.VITE_DEV) {
      base_url = 'http://localhost:3000';
    } else {
      base_url = 'https://kudos-board-eah6.onrender.com';
    }
    return base_url;
}
