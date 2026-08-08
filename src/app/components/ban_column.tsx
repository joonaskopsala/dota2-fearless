import heroes from '@jkopsala/dota2-heroes'
import { Close as CloseIcon } from '@mui/icons-material'
import {
  Box,
  IconButton,
  Radio,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  hasLoadedHeroImage,
  markHeroImageLoaded
} from '../util/hero_image_cache'
import { PlaceholderImage } from './Placeholder'

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
    <Stack flex={1} minWidth={0} spacing={1.5}>
      <Tooltip title={'Select active game to set bans for'} placement="top">
        <Box
          onClick={setActiveGameHandler}
          sx={{
            minHeight: 54,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            px: 1.25,
            py: 0.5,
            borderRadius: 1,
            cursor: 'pointer',
            backgroundColor:
              activeGame === game
                ? 'rgba(255,255,255,0.16)'
                : 'rgba(255,255,255,0.08)',
            border:
              activeGame === game
                ? '1px solid rgba(255,255,255,0.18)'
                : '1px solid rgba(255,255,255,0.1)',
            transition: 'background-color 0.2s ease, border-color 0.2s ease'
          }}
        >
          <Stack spacing={0.1} justifyContent="center" sx={{ minHeight: 36 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {`Game ${game}`}
            </Typography>
            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: '0.75rem',
                minHeight: 18,
                lineHeight: 1.2
              }}
            >
              {activeGame === game ? 'Selected for bans' : 'Click to select'}
            </Typography>
          </Stack>
          <Radio onClick={setActiveGameHandler} checked={activeGame === game} />
        </Box>
      </Tooltip>
      <Stack
        sx={{
          background: bgTransparency
            ? 'transparent'
            : 'linear-gradient(180deg, #6e0000, #330000)',
          borderRadius: '0.6rem',
          border: bgTransparency
            ? '1px dashed rgba(255,255,255,0.18)'
            : '1px solid rgba(255,255,255,0.08)',
          boxShadow: bgTransparency ? 'none' : '0 8px 20px rgba(0,0,0,0.12)',
          p: 1
        }}
        width={{ xs: '100%', sm: 125 }}
        alignItems="center"
        justifyContent="center"
      >
        <Stack spacing={1} width="100%">
          {Array.from({ length: banSlots }).map((_, index) => {
            const heroId = bans[index]
            return (
              <Banslot
                key={index}
                game={game}
                heroId={heroId}
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
  game,
  heroId,
  game1Bans,
  setGame1Bans,
  game2Bans,
  setGame2Bans
}: {
  game: number
  heroId?: number
  game1Bans: number[]
  setGame1Bans: Dispatch<SetStateAction<number[]>>
  game2Bans: number[]
  setGame2Bans: Dispatch<SetStateAction<number[]>>
}) => {
  const hero = heroes.find(h => h.id === heroId)

  const [imageLoaded, setImageLoaded] = useState<boolean>(() =>
    hasLoadedHeroImage(hero?.image)
  )
  const [animationKey, setAnimationKey] = useState<number>(0)

  const handleClick = () => {
    if (game === 1) {
      setGame1Bans(game1Bans.filter(b => b !== heroId))
    } else {
      setGame2Bans(game2Bans.filter(b => b !== heroId))
    }
    setImageLoaded(false)
    setAnimationKey(prev => prev + 1)
  }

  return (
    <Box
      sx={{
        boxShadow: 2,
        aspectRatio: '9 / 5',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 1,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.08)'
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
            sizes="(max-width: 600px) 100vw, 140px"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 0.5s ease',
              opacity: imageLoaded ? 1 : 0,
              borderRadius: '0.3rem'
            }}
            onLoad={() => {
              markHeroImageLoaded(hero.image)
              setImageLoaded(true)
            }}
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
                backgroundColor: 'rgba(31, 31, 31, 0.26)',
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
              '&:hover, &:focus-within': {
                opacity: 1
              }
            }}
          >
            <IconButton
              sx={{ color: 'white', width: '100%' }}
              onClick={handleClick}
              aria-label={`Remove ${hero.name} from game ${game} bans`}
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
