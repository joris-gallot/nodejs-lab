import type { RequestListener } from 'node:http'

export type Handler<P extends any[] = []> = RequestListener extends (...p: infer RP) => infer R ? (...p: [...RP, ...P]) => R : never
