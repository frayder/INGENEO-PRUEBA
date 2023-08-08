
var config = {
  env: 'dev',
  db: {
    
    mongo: {
      MONGO_HOST:  'helpdesk-shard-00-02.2cpjp.mongodb.net'
      ,MONGO_PORT: '27017'
      ,MONGO_SSL: 1
      ,MONGO_DATABASE: 'desarrollo'
      ,MONGO_USER: 'admin'
      ,MONGO_PASSWORD: 'sf1_xxxx'
      ,MONGO_AUTH_SOURCE: 'admin'
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
