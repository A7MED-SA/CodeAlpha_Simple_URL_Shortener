import { customAlphabet } from 'nanoid'
import { env } from '../config/env.js'
import { SHORT_CODE_ALPHABET } from '../utils/constants.js'

const generate = customAlphabet(SHORT_CODE_ALPHABET, env.SHORT_CODE_LENGTH)

export function generateShortCode(): string {
  return generate()
}
