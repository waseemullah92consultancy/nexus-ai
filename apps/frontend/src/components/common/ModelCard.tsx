'use client';

import React from 'react';
import { Box, Card, CardContent, Typography, Rating, Chip, useTheme } from '@mui/material';
import { Star, People, TrendingUp } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Model } from '@/types';
import { formatNumber, formatCurrency } from '@/utils';

interface ModelCardProps {
  model: Model;
  onClick?: () => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model, onClick }) => {
  const theme = useTheme();

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card
        onClick={onClick}
        sx={{
          height: '100%',
          cursor: 'pointer',
          backgroundColor: theme.palette.background.paper,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6" fontWeight={600} noWrap>
              {model.name}
            </Typography>
            <Chip
              label={model.lab}
              size="small"
              color="primary"
              variant="outlined"
            />
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Star sx={{ fontSize: 16, color: 'warning.main' }} />
              <Typography variant="body2" fontWeight={600}>
                {model.rating}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ({formatNumber(model.reviews)})
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <People sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {formatNumber(model.stats.users)} users
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
            {model.tags.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{ fontSize: 10, height: 20 }}
              />
            ))}
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pt: 1,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary">
                Input: {formatCurrency(model.pricing.input)}/1K
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                Output: {formatCurrency(model.pricing.output)}/1K
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUp sx={{ fontSize: 14, color: 'success.main' }} />
              <Typography variant="caption" color="success.main" sx={{ ml: 0.5 }}>
                {formatNumber(model.stats.requests)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};