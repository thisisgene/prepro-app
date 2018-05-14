const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-964279.oktapreview.com',
  token: '00vyQEAaqGiBhoiBuEjOCuj6PuvSGDc22Pk1__BIJr'
});

module.exports = client;