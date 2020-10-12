import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const saltRounds = 10

export function signToken ({ _id }, { expiresIn = '10d' } = { expiresIn: '10d' }): string {
  return jwt.sign({ _id, createdAt: Date.now() }, process.env.AUTH_SECRET, { expiresIn })
}

export function verifyToken (token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.AUTH_SECRET, function (err, decoded) {
      if (err) reject(err)
      resolve(decoded as any)
    })
  })
}

export function decodeToken (token: string): string | { [key: string]: any } {
  return jwt.decode(token, {
    json: true
  })
}

export async function hashPassword (password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds)
  return bcrypt.hash(password, salt)
}

export function comparePassword (password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function validateAuthHeader (authHeader: string): Promise<any> {
  if (!authHeader) {
    throw new Error('No auth header was sent')
  }
  const parts = authHeader.split(' ')
  if (parts.length !== 2) {
    throw new Error('Authentication header is invalid, did you forget the Bearer prefix?')
  }
  if (parts[0] === 'Bearer') {
    const token = parts[1]
    return verifyToken(token)
  }

  throw new Error('Unknown auth scheme, please send your header as Bearer <token>')
}
