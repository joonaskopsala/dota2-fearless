'use client'

import heroes from '@jkopsala/dota2-heroes'
import {
  Box,
  Chip,
  Container,
  Snackbar,
  Stack,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Bancolumn } from './components/ban_column'
import { Hero } from './components/hero'
import { Panel } from './components/panel'
import { Toolbar } from './components/toolbar'
import { hydrateHeroImageCache } from './util/hero_image_cache'

const backgroundColor = '#676767'

export default function Page() {
  useEffect(() => {
    hydrateHeroImageCache()

    const handleBeforeUnload = () => {
      return 'You have unsaved changes. Are you sure you want to leave?'
    }

    window.onbeforeunload = handleBeforeUnload

    return () => {
      window.onbeforeunload = null
    }
  }, [])

  const [game1Bans, setGame1Bans] = useState([] as number[])
  const [game2Bans, setGame2Bans] = useState([] as number[])
  const [activeGame, setActiveGame] = useState<number>(1)
  const [transparentBg, setTransparentBg] = useState<boolean>(false)
  const [copyFeedbackOpen, setCopyFeedbackOpen] = useState<boolean>(false)

  const clearAll = () => {
    setGame1Bans([])
    setGame2Bans([])
    setBanColumnKey(banColumnKey + 1)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(backgroundColor)
      setCopyFeedbackOpen(true)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  const removeBarBgs = () => {
    setTransparentBg(!transparentBg)
  }

  const [banColumnKey, setBanColumnKey] = useState<number>(1) //use this to force react to reload component after we clear all
  const totalBans = game1Bans.length + game2Bans.length

  return (
    <Container
      maxWidth={false}
      sx={{
        px: { xs: 1.5, sm: 2.5, lg: 3 },
        py: { xs: 1.5, sm: 2 },
        minHeight: '100vh'
      }}
    >
      <Stack spacing={2}>
        <Panel>
          <Toolbar
            activeGame={activeGame}
            game1Count={game1Bans.length}
            game2Count={game2Bans.length}
            totalBans={totalBans}
            transparentBg={transparentBg}
            backgroundColor={backgroundColor}
            onCopyBackground={copyToClipboard}
            onToggleBackgrounds={removeBarBgs}
            onClearAll={clearAll}
          />
        </Panel>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '320px minmax(0, 1fr)' },
            gap: 2,
            alignItems: 'start'
          }}
        >
          <Stack spacing={2}>
            <Panel>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                Ban columns
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                gap={2}
                alignItems="stretch"
                justifyContent="space-between"
              >
                <Bancolumn
                  key={banColumnKey}
                  game={1}
                  bans={game1Bans}
                  setActiveGame={setActiveGame}
                  activeGame={activeGame}
                  setGame1Bans={setGame1Bans}
                  game1Bans={game1Bans}
                  setGame2Bans={setGame2Bans}
                  game2Bans={game2Bans}
                  bgTransparency={transparentBg}
                />
                <Bancolumn
                  key={banColumnKey + 69}
                  game={2}
                  bans={game2Bans}
                  setActiveGame={setActiveGame}
                  activeGame={activeGame}
                  setGame1Bans={setGame1Bans}
                  game1Bans={game1Bans}
                  setGame2Bans={setGame2Bans}
                  game2Bans={game2Bans}
                  bgTransparency={transparentBg}
                />
              </Stack>
            </Panel>
          </Stack>

          <Panel sx={{ minWidth: 0 }}>
            <Stack spacing={2}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
              >
                <Stack spacing={0.5}>
                  <Typography variant="h6" fontWeight={700}>
                    Hero pool
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Disabled heroes are already banned in one of the two games.
                  </Typography>
                </Stack>
                <Chip
                  label={`Active game: ${activeGame}`}
                  color="primary"
                  sx={{ fontWeight: 700 }}
                />
              </Stack>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(76px, 1fr))',
                  gap: { xs: 0.75, sm: 1 },
                  alignItems: 'start'
                }}
              >
                {heroes.map(hero => (
                  <Hero
                    key={hero.name}
                    hero={hero}
                    activeGame={activeGame}
                    game1Bans={game1Bans}
                    game2Bans={game2Bans}
                    setGame1Bans={setGame1Bans}
                    setGame2Bans={setGame2Bans}
                  />
                ))}
              </Box>
            </Stack>
          </Panel>
        </Box>

        <Snackbar
          open={copyFeedbackOpen}
          autoHideDuration={1800}
          onClose={() => setCopyFeedbackOpen(false)}
          message="Background color copied"
        />
      </Stack>
    </Container>
  )
}
