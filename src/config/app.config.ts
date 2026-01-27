export const appConfig = () => {
  return {
    environment: process.env.NODE_ENV,
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      userName: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: process.env.DB_SYNC === 'true' ? true : false,
      autoLoadEntities: process.env.AUTO_LOAD === 'true' ? true : false,
      name: process.env.DB_NAME,
    },
  };
};
