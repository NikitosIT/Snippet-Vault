export const appConfig = () => ({
  port: Number(process.env.PORT) || 3002,
  frontendUrls: (process.env.FRONTEND_URL || 'http://localhost:3000')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean),
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/snippet-vault',
});
