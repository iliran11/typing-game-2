export function VersionController(req, res) {
  res
    .status(200)
    .send({ version: '0.9.2', enviroment: process.env.SERVER_ENVIROMENT });
}
