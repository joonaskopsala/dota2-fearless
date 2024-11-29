'use client'

import { Button, Container, Stack, Tooltip, Typography } from '@mui/material'
import dota2Heroes from './resources/dota2_heroes.json'
import { Hero } from './components/hero'
import { Bancolumn } from './components/ban_column'
import { useEffect, useState } from 'react'
import SquareIcon from '@mui/icons-material/Square'

export default function Page() {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message =
        'You have unsaved changes. Are you sure you want to leave?'
      event.returnValue = message
      return message
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const [game1Bans, setGame1Bans] = useState([] as number[])
  const [game2Bans, setGame2Bans] = useState([] as number[])
  const [activeGame, setActiveGame] = useState<number>(1)
  const [transparentBg, setTransparentBg] = useState<boolean>(false)

  const clearAll = () => {
    setGame1Bans([])
    setGame2Bans([])
    setBanColumnKey(banColumnKey + 1)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('#676767')
      alert('Background color copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  const removeBarBgs = () => {
    setTransparentBg(!transparentBg)
  }

  const [banColumnKey, setBanColumnKey] = useState<number>(1) //use this to force react to reload component after we clear all

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'space-between'
      }}
    >
      <Stack alignItems="center" sx={{ flexGrow: 1, marginTop: '1rem' }}>
        <Stack direction="row" spacing={2} alignItems="center"></Stack>
        <Stack width={'100vw'} direction="row" gap={6} justifyContent="center">
          <Stack spacing={2}>
            <Stack direction="row" gap={8} marginLeft={5}>
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
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              paddingTop={2}
            >
              <Typography variant="body2" color="whitesmoke" fontWeight="bold">
                {'Background Color:'}
              </Typography>
              <Tooltip title={'Click to copy background color for OBS'}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SquareIcon sx={{ color: '#676767' }} />}
                  onClick={copyToClipboard}
                  sx={{
                    backgroundColor: 'whitesmoke',
                    color: 'black',
                    fontWeight: 'bold'
                  }}
                >
                  {'#676767'}
                </Button>
              </Tooltip>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              paddingTop={0}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={removeBarBgs}
                sx={{
                  backgroundColor: 'whitesmoke',
                  color: 'black',
                  fontWeight: 'bold'
                }}
              >
                {'Remove backgrounds from bars'}
              </Button>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            sx={{
              width: '80%',
              flexWrap: 'wrap',
              height: '90%',
              gap: 1,
              alignItems: 'flex-start',
              marginTop: '2rem'
            }}
          >
            {dota2Heroes.map(hero => (
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
          </Stack>
        </Stack>
        <Button
          variant="contained"
          disabled={game1Bans.length === 0 && game2Bans.length === 0}
          sx={{
            width: '20%',
            margin: 5,
            backgroundColor: 'whitesmoke',
            color: 'black',
            marginTop: 'auto'
          }}
          onClick={clearAll}
        >
          <Typography fontWeight="bold">{'Clear all'}</Typography>
        </Button>
      </Stack>
    </Container>
  )
}
