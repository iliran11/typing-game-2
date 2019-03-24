export function VersionController(req, res) {
  res
    .status(200)
    .send({ version: '0.7.0', enviroment: process.env.SERVER_ENVIROMENT });
}
