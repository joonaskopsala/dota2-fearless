import { Box, IconButton, Radio, Stack, Tooltip } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'
import { PlaceholderImage } from './Placeholder'
import { Close as CloseIcon } from '@mui/icons-material'
import dota2Heroes from '../resources/dota2_heroes.json'

const Bancolumn = ({
  game,
  bans,
  setActiveGame,
  activeGame,
  game1Bans,
  setGame1Bans,
  game2Bans,
  setGame2Bans,
  bgTransparency
}: {
  game: number
  bans: number[]
  setActiveGame: Dispatch<SetStateAction<number>>
  activeGame: number
  game1Bans: number[]
  setGame1Bans: Dispatch<SetStateAction<number[]>>
  game2Bans: number[]
  setGame2Bans: Dispatch<SetStateAction<number[]>>
  bgTransparency: boolean
}) => {
  const banSlots = 10

  const setActiveGameHandler = () => {
    setActiveGame(game)
  }

  return (
    <Stack height="72vh">
      <Tooltip title={'Select active game to set bans for'} placement="top">
        <Box
          sx={{
            backgroundColor: 'whitesmoke',
            width: '35%',
            marginBottom: '1rem',
            alignSelf: 'center',
            borderRadius: '0.5rem'
          }}
        >
          <Radio onClick={setActiveGameHandler} checked={activeGame === game} />
        </Box>
      </Tooltip>
      <Stack
        sx={{
          background: bgTransparency
            ? 'transparent'
            : 'linear-gradient(180deg,#6e0000,#330000)',
          borderRadius: '0.6rem'
        }}
        width={120}
        height={'105%'}
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Stack spacing={1}>
          {Array.from({ length: banSlots }).map((_, index) => {
            const heroId = bans[index]
            return (
              <Banslot
                key={index}
                heroId={heroId}
                activeGame={activeGame}
                game1Bans={game1Bans}
                setGame1Bans={setGame1Bans}
                game2Bans={game2Bans}
                setGame2Bans={setGame2Bans}
              />
            )
          })}
        </Stack>
      </Stack>
    </Stack>
  )
}

const Banslot = ({
  heroId,
  activeGame,
  game1Bans,
  setGame1Bans,
  game2Bans,
  setGame2Bans
}: {
  heroId?: number
  activeGame: number
  game1Bans: number[]
  setGame1Bans: Dispatch<SetStateAction<number[]>>
  game2Bans: number[]
  setGame2Bans: Dispatch<SetStateAction<number[]>>
}) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const [animationKey, setAnimationKey] = useState<number>(0)

  const handleClick = () => {
    if (activeGame === 1) {
      setGame1Bans(game1Bans.filter(b => b !== heroId))
    } else {
      setGame2Bans(game2Bans.filter(b => b !== heroId))
    }
    setImageLoaded(false)
    setAnimationKey(prev => prev + 1)
  }

  const hero = dota2Heroes.find(h => h.id === heroId)

  return (
    <Box
      sx={{
        boxShadow: 3,
        height: 50,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '0.3rem'
      }}
    >
      {hero ? (
        <>
          <Image
            key={`${heroId}-${animationKey}`}
            width={90}
            height={50}
            src={hero.image}
            alt={hero.name}
            style={{
              transition: 'opacity 0.5s ease',
              opacity: imageLoaded ? 1 : 0,
              borderRadius: '0.3rem'
            }}
            onLoad={() => setImageLoaded(true)}
          />
          {imageLoaded && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
                backgroundColor: 'rgba(31, 31, 31, 0.226)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '6px',
                  height: '250%',
                  background:
                    'linear-gradient(to bottom, #0000001e 0%, red 50%, #0000003a 100%)',
                  transformOrigin: 'center',
                  transform: 'rotate(60deg)',
                  top: -38,
                  left: '50%'
                }
              }}
            />
          )}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              opacity: 0,
              zIndex: 999,
              transition: 'opacity 0.3s ease',
              '&:hover': {
                opacity: 1
              }
            }}
          >
            <IconButton
              sx={{ color: 'white', width: '100%' }}
              onClick={handleClick}
              disabled={!hero}
              disableRipple
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <PlaceholderImage />
      )}
    </Box>
  )
}

export { Bancolumn }
