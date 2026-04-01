'use client';

import React from 'react';
import { Box, Card, CardContent, Typography, Chip, useTheme } from '@mui/material';
import { Code, Search, Edit, Analytics, Support } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Agent } from '@/types';
import { formatNumber } from '@/utils';

const iconMap: Record<string, React.ReactElement> = {
  Code: <Code />,
  Search: <Search />,
  Edit: <Edit />,
  Analytics: <Analytics />,
  Support: <Support />,
};

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onClick }) => {
  const theme = useTheme();

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card
        onClick={onClick}
        sx={{
          height: '100%',
          cursor: 'pointer',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.primary.main + '20',
                color: theme.palette.primary.main,
              }}
            >
              {iconMap[agent.icon] || <Code />}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={600}>
                {agent.name}
              </Typography>
              <Chip label={agent.category} size="small" variant="outlined" />
            </Box>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {agent.description}
          </Typography>

          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
            {agent.features.slice(0, 3).map((feature) => (
              <Chip
                key={feature}
                label={feature}
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
            <Typography variant="body2" fontWeight={600}>
              {agent.rating} ★
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatNumber(agent.usageCount)} uses
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};