import bcryptjs from 'bcryptjs'

export const passwordEncription = async (password) => {
  const saltRounds = 10
  const salt = await bcryptjs.genSalt(saltRounds)
  const hashedPassword = await bcryptjs.hash(password, salt)
  return hashedPassword
}
