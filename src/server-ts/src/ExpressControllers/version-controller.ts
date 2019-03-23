export function VersionController(req, res) {
  res
    .status(200)
    .send({ version: '0.6.8', enviroment: process.env.SERVER_ENVIROMENT });
}
