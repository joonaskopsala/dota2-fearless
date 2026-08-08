// @vitest-environment node

import heroes from '@jkopsala/dota2-heroes'
import { describe, expect, test } from 'vitest'

const chunk = <T>(items: T[], size: number) => {
  const groups: T[][] = []

  for (let index = 0; index < items.length; index += size) {
    groups.push(items.slice(index, index + size))
  }

  return groups
}

describe('hero image URLs', () => {
  test('every hero image responds successfully', async () => {
    const failures: string[] = []

    for (const group of chunk(heroes, 12)) {
      const results = await Promise.all(
        group.map(async hero => {
          try {
            const response = await fetch(hero.image, { method: 'HEAD' })

            if (response.ok) {
              return
            }

            const fallbackResponse = await fetch(hero.image)
            if (!fallbackResponse.ok) {
              failures.push(`${hero.name}: ${fallbackResponse.status}`)
            }
          } catch (error) {
            failures.push(
              `${hero.name}: ${error instanceof Error ? error.message : 'unknown error'}`
            )
          }
        })
      )

      await Promise.all(results)
    }

    expect(failures).toEqual([])
  }, 120000)
})
