var config = {
  env: 'test',
  db: {
    
    mongo: {
      MONGO_HOST:  'clusterrias-shard-00-00-ygnh9.azure.mongodb.net:27017,clusterrias-shard-00-01-ygnh9.azure.mongodb.net:27017,clusterrias-shard-00-02-ygnh9.azure.mongodb.net:27017'
      ,MONGO_PORT: '27017'
      ,MONGO_SSL: 1
      ,MONGO_DATABASE: 'RIAS_DB'
      ,MONGO_USER: 'rias'
      ,MONGO_PASSWORD: 'rt1_xxxx'
      ,MONGO_AUTH_SOURCE: 'admin'
      ,MONGO_REPLICASET:'ClusterRIAS-shard-0'
    }
    
  }, server: {
    host: '0.0.0.0',
    port: 3019,
    enableDebugMode: true,
  },
  newrelic: {
    app_name: 'Mongo-Api-RIAS',
    license_key: '048f32b982b19d50b7d442b06a487923ffcb7692'
  }
};

module.exports = Object.freeze(config);
