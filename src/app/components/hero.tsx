import { Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import type { Hero } from '../util/entity'
import {
  hasLoadedHeroImage,
  markHeroImageLoaded
} from '../util/hero_image_cache'

const Hero = ({
  hero,
  activeGame,
  game1Bans,
  setGame1Bans,
  game2Bans,
  setGame2Bans
}: {
  hero: Hero
  activeGame: number
  game1Bans: number[]
  setGame1Bans: Dispatch<SetStateAction<number[]>>
  game2Bans: number[]
  setGame2Bans: Dispatch<SetStateAction<number[]>>
}) => {
  const [isLoading, setIsLoading] = useState(!hasLoadedHeroImage(hero.image))

  const isBanned =
    game1Bans.findIndex(b => b === hero.id) != -1 ||
    game2Bans.findIndex(b => b === hero.id) != -1

  const handleClick = () => {
    if (activeGame === 1) {
      if (game1Bans.length < 10) {
        const newBans = [...game1Bans, hero.id]
        setGame1Bans(newBans)
      }
    } else {
      if (game2Bans.length < 10) {
        const newBans = [...game2Bans, hero.id]
        setGame2Bans(newBans)
      }
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isBanned}
      aria-label={`Ban ${hero.name} for game ${activeGame}`}
      sx={{
        position: 'relative',
        cursor: isBanned ? 'default' : 'pointer',
        p: 0,
        minWidth: 0,
        width: '100%',
        borderRadius: 1,
        overflow: 'hidden',
        transition: 'transform 0.18s ease',
        '&:hover': {
          transform: isBanned ? 'none' : 'translateY(-1px)'
        }
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '9 / 5',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 1
        }}
      >
        {isLoading && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{
              position: 'absolute',
              zIndex: 3,
              inset: 0,
              borderRadius: 1,
              transform: 'none'
            }}
          />
        )}
        <Image
          width={90}
          height={50}
          src={hero.image}
          alt={hero.name}
          onLoad={() => {
            markHeroImageLoaded(hero.image)
            setIsLoading(false)
          }}
          style={{
            position: 'absolute',
            inset: 0,
            objectFit: 'cover',
            zIndex: isBanned ? 1 : 0,
            filter: isBanned ? 'blur(3px)' : 'none',
            borderRadius: '0.3rem',
            opacity: isLoading ? 0 : 1,
            transitionProperty: 'filter, opacity',
            transitionDuration: '0.5s'
          }}
        />
        {isBanned && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(255, 0, 0, 0.329)',
              zIndex: 2,
              borderRadius: '0.3rem'
            }}
          />
        )}
      </Box>
    </Button>
  )
}

export { Hero }
