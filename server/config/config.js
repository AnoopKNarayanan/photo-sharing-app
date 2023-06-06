import * as config from './config.json' assert { type: "json" };
var env = process.env.NODE_ENV || 'development';

var envConfig = config['default'][env];

Object.keys(envConfig).forEach(key =>  {
    process.env[key] = envConfig[key]
});