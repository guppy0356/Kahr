import { hc } from 'hono/client'
import type { AppType } from '../../../backend/src/api'

export const client = hc<AppType>('/api')
