'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAppSelector } from '@/hooks';

export default function HomePage() {
  const theme = useTheme();
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/chat');
    }
  }, [isAuthenticated, router]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
        padding: 4,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            fontWeight={700}
            textAlign="center"
            sx={{
              mb: 2,
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            NexusAI
          </Typography>

          <Typography
            variant="h5"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Discover and use the best AI models from leading research labs
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Link href="/signin" passHref style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="large">
                Sign In
              </Button>
            </Link>
            <Link href="/signup" passHref style={{ textDecoration: 'none' }}>
              <Button variant="outlined" size="large">
                Create Account
              </Button>
            </Link>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Box
            sx={{
              mt: 8,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 4,
              '@media (max-width: 768px)': {
                gridTemplateColumns: '1fr',
              },
            }}
          >
            {[
              { title: '13+ Models', desc: 'From top AI labs' },
              { title: '5 Agents', desc: 'Pre-built templates' },
              { title: 'Research', desc: 'Latest papers' },
            ].map((item) => (
              <Box
                key={item.title}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="h4" fontWeight={700} color="primary">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}