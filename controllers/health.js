/**
 * Route used to get the health status of the server
 *
 * @param _req {Object} - Express request object
 * @param res {Object} - Express response object
 */
const health = (_req, res) => {
  const response = {
    uptime: process.uptime(),
  };

  return res.json(response);
};

module.exports = health;
