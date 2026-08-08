import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import LayersClearRoundedIcon from '@mui/icons-material/LayersClearRounded'
import SquareIcon from '@mui/icons-material/Square'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { Chip, Stack, Tooltip, Typography } from '@mui/material'
import { ToolButton } from './tool_button'

type ToolbarProps = {
  activeGame: number
  game1Count: number
  game2Count: number
  totalBans: number
  transparentBg: boolean
  backgroundColor: string
  onCopyBackground: () => void
  onToggleBackgrounds: () => void
  onClearAll: () => void
}

const Toolbar = ({
  activeGame,
  game1Count,
  game2Count,
  totalBans,
  transparentBg,
  backgroundColor,
  onCopyBackground,
  onToggleBackgrounds,
  onClearAll
}: ToolbarProps) => {
  return (
    <Stack spacing={1.5}>
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        spacing={1.5}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', lg: 'center' }}
      >
        <Stack spacing={0.5}>
          <Typography variant="h5" fontWeight={700}>
            Fearless mode ban tool
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Select the active game and click heroes to add bans.
          </Typography>
        </Stack>
        <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center">
          <Chip
            label={`Game 1: ${game1Count}/10`}
            color={activeGame === 1 ? 'primary' : 'default'}
            variant={activeGame === 1 ? 'filled' : 'outlined'}
          />
          <Chip
            label={`Game 2: ${game2Count}/10`}
            color={activeGame === 2 ? 'primary' : 'default'}
            variant={activeGame === 2 ? 'filled' : 'outlined'}
          />
          <Chip label={`${20 - totalBans} bans remaining`} variant="outlined" />
        </Stack>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} gap={1} flexWrap="wrap">
        <Tooltip title={'Click to copy background color for OBS'}>
          <span>
            <ToolButton
              variant="contained"
              onClick={onCopyBackground}
              startIcon={<SquareIcon sx={{ color: backgroundColor }} />}
              endIcon={<ContentCopyRoundedIcon />}
              sx={{ minWidth: { xs: '100%', sm: 205 } }}
            >
              {backgroundColor}
            </ToolButton>
          </span>
        </Tooltip>
        <ToolButton
          variant="contained"
          onClick={onToggleBackgrounds}
          startIcon={
            transparentBg ? (
              <VisibilityRoundedIcon />
            ) : (
              <VisibilityOffRoundedIcon />
            )
          }
          sx={{ minWidth: { xs: '100%', sm: 205 } }}
        >
          {transparentBg ? 'Show bar backgrounds' : 'Hide bar backgrounds'}
        </ToolButton>
        <ToolButton
          variant="outlined"
          disabled={totalBans === 0}
          onClick={onClearAll}
          startIcon={<LayersClearRoundedIcon />}
          sx={{ minWidth: { xs: '100%', sm: 150 } }}
        >
          Clear all
        </ToolButton>
      </Stack>
    </Stack>
  )
}

export { Toolbar }
