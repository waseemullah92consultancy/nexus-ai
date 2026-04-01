'use client';

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  useTheme,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  People,
  Science,
  AutoAwesome,
  ModelTraining,
  Business,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useGetModelStatsQuery, useGetModelsQuery, useGetLabsQuery, useGetTrendingResearchQuery } from '@/store/api';
import { LoadingSpinner } from '@/components/common';
import { formatNumber } from '@/utils';

export default function DiscoverPage() {
  const theme = useTheme();
  const { data: stats, isLoading: statsLoading } = useGetModelStatsQuery();
  const { data: models, isLoading: modelsLoading } = useGetModelsQuery();
  const { data: labs, isLoading: labsLoading } = useGetLabsQuery();
  const { data: research, isLoading: researchLoading } = useGetTrendingResearchQuery();

  const isLoading = statsLoading || modelsLoading || labsLoading || researchLoading;

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  const featuredModels = models?.slice(0, 3) || [];
  const pricingTiers = [
    { name: 'Free', price: '$0', features: ['100 requests/day', '3 models', 'Basic support'] },
    { name: 'Pro', price: '$29', features: ['10,000 requests/day', 'All models', 'Priority support', 'Advanced features'] },
    { name: 'Enterprise', price: 'Custom', features: ['Unlimited requests', 'All models', '24/7 support', 'Custom integrations', 'SLA'] },
  ];
  const useCases = [
    { title: 'Content Creation', description: 'Generate articles, marketing copy, and creative content' },
    { title: 'Code Assistance', description: 'Write, review, and debug code with AI assistance' },
    { title: 'Data Analysis', description: 'Analyze and visualize data with natural language queries' },
    { title: 'Research', description: 'Synthesize research papers and generate insights' },
  ];

  return (
    <Box sx={{ p: 3, height: 'calc(100vh - 64px)', overflow: 'auto' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Hero Section */}
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Discover NexusAI
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Explore the capabilities of AI models from leading research labs
        </Typography>

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            { label: 'Models Available', value: stats?.totalModels || 0, icon: <ModelTraining /> },
            { label: 'Research Labs', value: stats?.totalLabs || 0, icon: <Business /> },
            { label: 'Total Users', value: formatNumber(stats?.totalUsers || 0), icon: <People /> },
            { label: 'API Requests', value: formatNumber(stats?.totalRequests || 0), icon: <TrendingUp /> },
          ].map((stat, index) => (
            <Grid item xs={6} md={3} key={stat.label}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.2 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      {stat.icon}
                      <Typography variant="h4" fontWeight={700}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Featured Models */}
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          Featured Models
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {featuredModels.map((model, index) => (
            <Grid item xs={12} md={4} key={model.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.2 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6" fontWeight={600}>
                        {model.name}
                      </Typography>
                      <Chip label={model.lab} size="small" color="primary" variant="outlined" />
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {model.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {model.tags.slice(0, 2).map((tag) => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Labs Section */}
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          Research Labs
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {labs?.map((lab, index) => (
            <Grid item xs={6} sm={4} md={2} key={lab.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05, duration: 0.2 }}
              >
                <Card sx={{ height: '100%', textAlign: 'center' }}>
                  <CardContent>
                    <Business sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                    <Typography variant="subtitle2" fontWeight={600}>
                      {lab.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {lab.modelsCount} models
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Trending Research */}
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          Trending Research
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {research?.slice(0, 3).map((item, index) => (
            <Grid item xs={12} md={4} key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.2 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Science fontSize="small" color="primary" />
                      <Chip label={item.lab} size="small" />
                    </Box>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {item.abstract}
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">
                        {formatNumber(item.citations)} citations
                      </Typography>
                      {item.trending && (
                        <Chip
                          icon={<TrendingUp />}
                          label="Trending"
                          size="small"
                          color="success"
                        />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Pricing Tiers */}
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          Pricing Tiers
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {pricingTiers.map((tier, index) => (
            <Grid item xs={12} md={4} key={tier.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.2 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    border: index === 1 ? `2px solid ${theme.palette.primary.main}` : undefined,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight={600}>
                      {tier.name}
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="primary" sx={{ my: 1 }}>
                      {tier.price}
                      {tier.price !== 'Custom' && <Typography component="span" variant="body2">/mo</Typography>}
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      {tier.features.map((feature) => (
                        <Typography key={feature} variant="body2" component="li" sx={{ mb: 0.5 }}>
                          {feature}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Use Cases */}
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          Use Cases
        </Typography>
        <Grid container spacing={3}>
          {useCases.map((useCase, index) => (
            <Grid item xs={12} sm={6} md={3} key={useCase.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.2 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <AutoAwesome sx={{ color: 'primary.main', mb: 1 }} />
                    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
                      {useCase.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {useCase.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
}