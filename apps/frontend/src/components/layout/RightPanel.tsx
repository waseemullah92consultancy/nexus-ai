'use client';

import React from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Chip, useTheme } from '@mui/material';
import { Settings, HelpOutline, History, BookmarkBorder, LightbulbOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';

const quickActions = [
  { label: 'Settings', icon: <Settings /> },
  { label: 'Help & FAQ', icon: <HelpOutline /> },
  { label: 'History', icon: <History /> },
  { label: 'Saved', icon: <BookmarkBorder /> },
];

const suggestions = [
  'Explain quantum computing',
  'Write a haiku about programming',
  'Create a business plan',
  'Debug my React component',
];

export const RightPanel: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 280,
        height: '100%',
        borderLeft: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" fontWeight={700}>
          Tools
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        <List dense>
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ borderRadius: 2, mx: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>{action.icon}</ListItemIcon>
                  <ListItemText primary={action.label} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </List>

        <Box sx={{ px: 2, py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <LightbulbOutlined fontSize="small" color="primary" />
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              SUGGESTIONS
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05, duration: 0.2 }}
              >
                <Chip
                  label={suggestion}
                  size="small"
                  variant="outlined"
                  onClick={() => {}}
                  sx={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    textOverflow: 'ellipsis',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main + '10',
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="caption" color="text.secondary">
          NexusAI v1.0.0
        </Typography>
      </Box>
    </Box>
  );
};