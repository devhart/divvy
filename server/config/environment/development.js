export default {
  sequelize: {
    uri: 'sqlite://',
    options: {
      dialect: 'sqlite',
      logging: false,
      storage: 'dev.sqlite',
      define: {
        timestamps: false,
      },
    },
  },
};
