export const appConfig = () => ({
  port: Number(process.env.PORT) || 3002,
  frontendUrls: process.env.FRONTEND_URL?.split(',')
    .map((url) => url.trim())
    .filter(Boolean),
  mongoUri: process.env.MONGO_URI,
});
