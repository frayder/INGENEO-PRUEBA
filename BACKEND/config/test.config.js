var config = {
  env: 'test',
  db: {
    
    mongo: {
      MONGO_HOST:  'localhost'
      ,MONGO_PORT: '27017'
      ,MONGO_DATABASE: 'Logistica'
    }

  }, server: {
    host: '0.0.0.0',
    port: 3019,
    enableDebugMode: true,
  },
  // newrelic: {
  //   app_name: 'Mongo-Api-Rias',
  //   license_key: '048f32b982b19d50b7d442b06a487923ffcb7692'
  // }
};

module.exports = Object.freeze(config);

