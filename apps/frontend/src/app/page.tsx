'use client';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  Stack,
  Paper,
  Grid,
  TextField,
  Chip,
} from '@mui/material';
import {
  Language,
  MicNone,
  GraphicEq,
  Videocam,
  Cast,
  AttachFile,
  ImageOutlined,
  ArrowForward,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  const theme = useTheme();
  const router = useRouter();
  const goToChat = () => {
    router.push('/chat');
  };

  const tools = [
    { icon: '🎨', label: 'Create image' },
    { icon: '🎵', label: 'Generate Audio' },
    { icon: '🎬', label: 'Create video' },
    { icon: '📊', label: 'Create slides' },
    { icon: '📈', label: 'Create Infographs' },
    { icon: '❓', label: 'Create quiz' },
    { icon: '🗂️', label: 'Create Flashcards' },
    { icon: '🧠', label: 'Create Mind map' },
    { icon: '📉', label: 'Analyze Data' },
    { icon: '✍️', label: 'Write content' },
    { icon: '💻', label: 'Code Generation' },
    { icon: '📄', label: 'Document Analysis' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Box
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: 'background.paper',
        }}
      >
        <Container maxWidth="xl" sx={{ py: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={4}>
              <Typography variant="h6" fontWeight={800} sx={{ fontSize: 24 }}>
                NexusAI
              </Typography>
              <Stack direction="row" spacing={2.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
                {['Chat Hub', 'Marketplace', 'Discover New', 'Agents'].map((item) => (
                  <Typography key={item} variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
                    {item} 
                  </Typography>
                ))}
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                icon={<Language sx={{ fontSize: '14px !important' }} />}
                label="EN"
                size="small"
                sx={{ height: 30, fontSize: 11 }}
              />
              <Link href="/signin" passHref style={{ textDecoration: 'none' }}>
                <Button variant="outlined" sx={{ borderRadius: 99, px: 2.2, py: 0.7, fontSize: 12 }}>
                  Sign in
                </Button>
              </Link>
              <Link href="/signup" passHref style={{ textDecoration: 'none' }}>
                <Button variant="contained" endIcon={<ArrowForward sx={{ fontSize: 14 }} />} sx={{ borderRadius: 99, px: 2.2, py: 0.7, fontSize: 12 }}>
                  Get Started
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Stack alignItems="center" textAlign="center" spacing={2} sx={{ mt: 2.5 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 60, md: 72 },
                lineHeight: 1,
                letterSpacing: '-0.02em',
                fontWeight: 700,
              }}
            >
              <Box component="span" sx={{ color: 'primary.main', display: 'block' }}>
                AI model
              </Box>
              <Box component="span" sx={{ display: 'block' }}>
                with guided
              </Box>
              <Box component="span" sx={{ display: 'block' }}>
                discovery
              </Box>
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420, fontSize: 22 }}>
              You don&apos;t need to know anything about AI to get started. Just click the box below - we&apos;ll do
              the rest together. ✨
            </Typography>

            <Paper
              sx={{
                width: '100%',
                p: 0.8,
                borderRadius: 99,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.palette.mode === 'dark' ? 'none' : '0 6px 14px rgba(0,0,0,0.08)',
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Click here and type anything — or just say hi!"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  sx={{ ml: 1 }}
                />
                <MicNone fontSize="small" color="action" />
                <GraphicEq fontSize="small" color="action" />
                <Videocam fontSize="small" color="action" />
                <Cast fontSize="small" color="action" />
                <AttachFile fontSize="small" color="action" />
                <ImageOutlined fontSize="small" color="action" />
                <Button variant="contained" sx={{ borderRadius: 99, px: 2.2 }} onClick={goToChat}>
                  Let&apos;s go
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </motion.div>

        <Grid container spacing={1.2} sx={{ mt: 1.5 }} justifyContent="center">
          {tools.map((tool) => (
            <Grid item xs={6} sm={4} md={2} key={tool.label}>
              <Paper
                onClick={goToChat}
                sx={{
                  p: 1.1,
                  borderRadius: 2.8,
                  border: `1px solid ${theme.palette.divider}`,
                  textAlign: 'center',
                  minHeight: 84,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
                  },
                }}
              >
                <Typography sx={{ fontSize: 17, mb: 0.4 }}>{tool.icon}</Typography>
                <Typography sx={{ fontSize: 11, fontWeight: 600, lineHeight: 1.2 }}>{tool.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Stack direction="row" justifyContent="center" spacing={1.3} sx={{ mt: 1.2 }}>
          {['🌐 Translate', '🔭 Just Exploring'].map((item) => (
            <Paper
              key={item}
              onClick={goToChat}
              sx={{
                borderRadius: 99,
                px: 2.2,
                py: 1,
                border: `1px solid ${theme.palette.divider}`,
                cursor: 'pointer',
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 600 }}>{item}</Typography>
            </Paper>
          ))}
        </Stack>

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 1.8, pb: 3 }}>
          {[
            { value: '525+', label: 'AI Models' },
            { value: '82K', label: 'Builders' },
            { value: '28', label: 'AI Labs' },
            { value: '4.8⭐', label: 'Avg Rating' },
          ].map((stat) => (
            <Grid item key={stat.label}>
              <Box textAlign="center">
                <Typography sx={{ fontSize: 42, fontWeight: 800, lineHeight: 1 }}>{stat.value}</Typography>
                <Typography color="text.secondary" sx={{ fontSize: 12 }}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}