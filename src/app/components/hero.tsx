import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import type { Hero } from '../util/entity'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Skeleton } from '@mui/material'

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
  const [isLoading, setIsLoading] = useState(true)

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
      sx={{
        position: 'relative',
        cursor: isBanned ? 'default' : 'pointer',
        p: 0
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 90,
          height: 50,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isLoading && (
          <Skeleton
            variant="rectangular"
            width={90}
            height={50}
            sx={{
              position: 'absolute',
              zIndex: 3,
              borderRadius: '0.3rem'
            }}
          />
        )}
        <Image
          width={90}
          height={50}
          src={hero.image}
          alt={hero.name}
          onLoad={() => setIsLoading(false)}
          style={{
            position: 'absolute',
            inset: 0,
            objectFit: 'cover',
            zIndex: isBanned ? 1 : 0,
            filter: isBanned ? 'blur(3px)' : 'none',
            transition: 'filter 0.5s ease',
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
