'use client';

import { useMemo, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Stack,
  Button,
  Grid,
  useTheme,
} from '@mui/material';
import { Search, Star, AutoAwesome } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useGetModelsQuery, useGetLabsQuery } from '@/store/api';
import { LoadingSpinner } from '@/components/common';
import { formatCurrency } from '@/utils';
import { useAppDispatch } from '@/hooks';
import { setRightPanelOpen, setSidebarOpen } from '@/store/slices/uiSlice';

export default function MarketplacePage() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [selectedLab, setSelectedLab] = useState<string>('All Labs');
  const [selectedProvider, setSelectedProvider] = useState<string>('Any');
  const [selectedPricing, setSelectedPricing] = useState<string>('Any');

  const { data: models, isLoading: modelsLoading } = useGetModelsQuery();
  const { data: labs } = useGetLabsQuery();

  useEffect(() => {
    dispatch(setSidebarOpen(false));
    dispatch(setRightPanelOpen(false));
    return () => {
      dispatch(setSidebarOpen(true));
      dispatch(setRightPanelOpen(true));
    };
  }, [dispatch]);

  const topCapabilityFilters = ['AI', 'Language', 'Vision', 'Code', 'Image Gen', 'Audio', 'Open Source'];
  const pricingFilters = ['Pay-per-use', 'Subscription', 'Free tier', 'Enterprise'];
  const providers = ['OpenAI', 'Anthropic', 'Google', 'Meta', 'Mistral', 'Cohere'];

  const labChips = useMemo(
    () => ['All Labs', ...(labs?.map((l) => l.name) || [])],
    [labs],
  );

  const filteredModels = useMemo(() => {
    if (!models) return [];
    return models.filter((model) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        !search ||
        model.name.toLowerCase().includes(searchLower) ||
        model.description.toLowerCase().includes(searchLower);
      const matchesLab = selectedLab === 'All Labs' || model.lab === selectedLab;
      const matchesProvider = selectedProvider === 'Any' || model.lab === selectedProvider;
      return matchesSearch && matchesLab && matchesProvider;
    });
  }, [models, search, selectedLab, selectedProvider]);

  if (modelsLoading || !models) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        overflow: 'auto',
        px: { xs: 1, md: 1.5 },
        py: 1,
        bgcolor: 'background.default',
      }}
    >
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <Stack direction={{ xs: 'column', lg: 'row' }} alignItems={{ xs: 'stretch', lg: 'center' }} spacing={1} sx={{ mb: 1.2 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 22, minWidth: 170 }}>Model Marketplace</Typography>
          <TextField
            size="small"
            placeholder="Search models, capabilities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: { xs: '100%', lg: 320 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ fontSize: 16 }} />
                </InputAdornment>
              ),
            }}
          />
          <Stack direction="row" spacing={0.7} sx={{ flexWrap: 'wrap' }}>
            <Chip label="AI" size="small" color="warning" />
            {topCapabilityFilters.slice(1).map((item) => (
              <Chip key={item} label={item} size="small" />
            ))}
          </Stack>
        </Stack>

        <Stack direction="row" spacing={0.7} sx={{ mb: 1.2, flexWrap: 'wrap' }} alignItems="center">
          <Typography variant="caption" color="text.secondary" sx={{ mr: 0.5 }}>
            AI LABS:
          </Typography>
          {labChips.map((lab) => (
            <Chip
              key={lab}
              label={lab}
              size="small"
              clickable
              color={selectedLab === lab ? 'warning' : 'default'}
              onClick={() => setSelectedLab(lab)}
            />
          ))}
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '280px 1fr' },
            gap: 1.2,
          }}
        >
          <Paper
            sx={{
              p: 1.2,
              borderRadius: 2,
              height: 'fit-content',
              bgcolor: 'background.paper',
            }}
          >
              <Paper
                sx={{
                  p: 1.2,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.14 : 0.08),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                  mb: 1.4,
                }}
              >
                <Typography sx={{ fontSize: 12, fontWeight: 700, mb: 0.4 }}>+ Need help choosing?</Typography>
                <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                  Chat with our AI guide for recommendations in 60 seconds.
                </Typography>
              </Paper>

              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>PROVIDER</Typography>
              <Stack sx={{ mb: 1.2 }}>
                <Button
                  size="small"
                  onClick={() => setSelectedProvider('Any')}
                  sx={{ justifyContent: 'flex-start', fontSize: 11, color: selectedProvider === 'Any' ? 'primary.main' : 'text.primary' }}
                >
                  Any
                </Button>
                {providers.map((p) => (
                  <Button
                    key={p}
                    size="small"
                    onClick={() => setSelectedProvider(p)}
                    sx={{ justifyContent: 'flex-start', fontSize: 11, color: selectedProvider === p ? 'primary.main' : 'text.primary' }}
                  >
                    {p}
                  </Button>
                ))}
              </Stack>

              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>PRICING MODEL</Typography>
              <Stack sx={{ mb: 1.2 }}>
                <Button
                  size="small"
                  onClick={() => setSelectedPricing('Any')}
                  sx={{ justifyContent: 'flex-start', fontSize: 11, color: selectedPricing === 'Any' ? 'primary.main' : 'text.primary' }}
                >
                  Any
                </Button>
                {pricingFilters.map((p) => (
                  <Button
                    key={p}
                    size="small"
                    onClick={() => setSelectedPricing(p)}
                    sx={{ justifyContent: 'flex-start', fontSize: 11, color: selectedPricing === p ? 'primary.main' : 'text.primary' }}
                  >
                    {p}
                  </Button>
                ))}
              </Stack>

              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>MAX PRICE /1M TOKENS</Typography>
              <Box sx={{ mt: 1, mb: 1.2 }}>
                <Box sx={{ height: 6, borderRadius: 99, bgcolor: alpha(theme.palette.primary.main, 0.95) }} />
                <Typography sx={{ fontSize: 10, color: 'text.secondary', mt: 0.6 }}>Up to $100</Typography>
              </Box>

              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>MIN RATING</Typography>
              <Stack direction="row" spacing={0.5} sx={{ mt: 0.8 }}>
                {['Any', '4+', '4.5+'].map((r) => (
                  <Chip key={r} label={r} size="small" />
                ))}
              </Stack>
          </Paper>

          <Box>
            <Grid container spacing={1.2}>
              {filteredModels.slice(0, 20).map((model, index) => (
                <Grid item xs={12} sm={6} md={4} key={model.id}>
                  <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03, duration: 0.2 }}>
                    <Paper
                      sx={{
                        p: 1.3,
                        borderRadius: 2,
                        minHeight: 170,
                        bgcolor: 'background.paper',
                        border: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={0.8} alignItems="center">
                          <AutoAwesome sx={{ fontSize: 14, color: 'primary.main' }} />
                          <Box>
                            <Typography sx={{ fontSize: 18, fontWeight: 700, lineHeight: 1.1 }}>{model.name}</Typography>
                            <Typography sx={{ fontSize: 10, color: 'text.secondary' }}>{model.lab}</Typography>
                          </Box>
                        </Stack>
                        <Chip size="small" label={index % 4 === 0 ? 'Hot' : 'New'} color={index % 4 === 0 ? 'warning' : 'success'} />
                      </Stack>

                      <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 1, minHeight: 38 }}>
                        {model.description.slice(0, 88)}...
                      </Typography>

                      <Stack direction="row" spacing={0.5} sx={{ mt: 1, flexWrap: 'wrap', rowGap: 0.5 }}>
                        {model.tags.slice(0, 3).map((tag) => (
                          <Chip key={tag} size="small" label={tag} />
                        ))}
                      </Stack>

                      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 1.2 }}>
                        <Stack direction="row" alignItems="center" spacing={0.3}>
                          <Star sx={{ fontSize: 13, color: '#f59e0b' }} />
                          <Typography sx={{ fontSize: 11 }}>{model.rating.toFixed(1)}</Typography>
                        </Stack>
                        <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                          ${formatCurrency(model.pricing.input)} / ${formatCurrency(model.pricing.output)} · How to Use →
                        </Typography>
                      </Stack>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}