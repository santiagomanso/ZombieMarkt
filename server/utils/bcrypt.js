import bcrypt from 'bcrypt'

export const passwordEncription = async (password) => {
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

export const comparePasswords = async (loginPassword, userPassword) => {
  const result = await bcrypt.compare(loginPassword, userPassword)
  return result
}
