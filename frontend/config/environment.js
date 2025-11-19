module.exports = function(environment){
  return { modulePrefix: 'lightweight-chat', environment, rootURL: '/', locationType: 'auto', APP:{ HUB_URL: process.env.HUB_URL || 'http://localhost:5000' } };
};
