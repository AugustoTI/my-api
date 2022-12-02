export default {
  jwt: {
    secret: process.env.JWT_SECRET || 'asdm230A+sfp-=f4glfçd',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
}
