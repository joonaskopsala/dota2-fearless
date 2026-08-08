const HERO_IMAGE_CACHE_KEY = 'fearless-loaded-hero-images'

const loadedHeroImages = new Set<string>()
let hydrated = false

const hydrateHeroImageCache = () => {
  if (hydrated || typeof window === 'undefined') {
    return
  }

  hydrated = true

  try {
    const rawValue = window.localStorage.getItem(HERO_IMAGE_CACHE_KEY)
    if (!rawValue) {
      return
    }

    const cachedImages = JSON.parse(rawValue)
    if (!Array.isArray(cachedImages)) {
      return
    }

    cachedImages.forEach(value => {
      if (typeof value === 'string') {
        loadedHeroImages.add(value)
      }
    })
  } catch {
    // Ignore malformed localStorage data.
  }
}

const persistHeroImageCache = () => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(
      HERO_IMAGE_CACHE_KEY,
      JSON.stringify(Array.from(loadedHeroImages))
    )
  } catch {
    // Ignore storage write failures.
  }
}

const hasLoadedHeroImage = (imageUrl?: string) => {
  if (!imageUrl) {
    return false
  }

  return loadedHeroImages.has(imageUrl)
}

const markHeroImageLoaded = (imageUrl?: string) => {
  if (!imageUrl) {
    return
  }

  loadedHeroImages.add(imageUrl)
  persistHeroImageCache()
}

export { hasLoadedHeroImage, hydrateHeroImageCache, markHeroImageLoaded }
