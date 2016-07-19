export default {
  ip: process.env.IP,
  port: process.env.PORT || 8080,
  sequelize: {
    // TODO: Use process.env.<DATABASE URI FROM HEROKU> here isntead of sqlite://
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'dist.sqlite',
      define: {
        timestamps: false,
      },
    },
  },
};
