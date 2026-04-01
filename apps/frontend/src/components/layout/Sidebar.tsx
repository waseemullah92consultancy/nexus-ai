'use client';

import React from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, useTheme } from '@mui/material';
import { SmartToy, AutoAwesome, Psychology, Code, Science, TrendingUp } from '@mui/icons-material';
import { useGetModelsQuery } from '@/store/api';
import { formatNumber } from '@/utils';
import { motion } from 'framer-motion';

const modelIcons: Record<string, React.ReactElement> = {
  'Language': <SmartToy />,
  'Vision': <AutoAwesome />,
  'Multimodal': <Psychology />,
  'Code': <Code />,
  'Research': <Science />,
};

interface SidebarProps {
  activeModel?: string;
  onSelectModel?: (modelId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeModel, onSelectModel }) => {
  const theme = useTheme();
  const { data: models, isLoading } = useGetModelsQuery();

  const categories = models
    ? Array.from(new Set(models.map((m) => m.category)))
    : [];

  return (
    <Box
      component="nav"
      sx={{
        width: 280,
        height: '100%',
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" fontWeight={700} color="primary">
          Models
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        {isLoading ? (
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Loading models...
            </Typography>
          </Box>
        ) : (
          <>
            <List dense>
              {models?.slice(0, 5).map((model) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={activeModel === model.id}
                      onClick={() => onSelectModel?.(model.id)}
                      sx={{
                        borderRadius: 2,
                        mx: 1,
                        '&.Mui-selected': {
                          backgroundColor: theme.palette.primary.main + '20',
                          '&:hover': {
                            backgroundColor: theme.palette.primary.main + '30',
                          },
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {modelIcons[model.category] || <SmartToy />}
                      </ListItemIcon>
                      <ListItemText
                        primary={model.name}
                        secondary={`${model.rating} ★ • ${formatNumber(model.stats.users)} users`}
                        primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItemButton>
                  </ListItem>
                </motion.div>
              ))}
            </List>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                CATEGORIES
              </Typography>
            </Box>

            <List dense>
              {categories.map((category) => (
                <ListItem key={category} disablePadding>
                  <ListItemButton sx={{ borderRadius: 2, mx: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {modelIcons[category] || <TrendingUp />}
                    </ListItemIcon>
                    <ListItemText
                      primary={category}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>

      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="caption" color="text.secondary">
          {models?.length || 0} models available
        </Typography>
      </Box>
    </Box>
  );
};