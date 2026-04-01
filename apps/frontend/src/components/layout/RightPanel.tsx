'use client';

import React from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import {
  AutoAwesome,
  MenuBook,
  Insights,
  ImageOutlined,
  GraphicEq,
  Videocam,
  Slideshow,
  Translate,
  QuizOutlined,
  StyleOutlined,
  BubbleChartOutlined,
  EditNote,
  Code,
  Description,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const quickActions = [
  { label: 'Browse Marketplace', icon: <MenuBook /> },
  { label: 'Build an Agent', icon: <AutoAwesome /> },
  { label: 'How to use Guide', icon: <MenuBook /> },
  { label: 'Prompt Engineering', icon: <Insights /> },
  { label: 'View Trends', icon: <Insights /> },
  { label: 'AI Models Analysis', icon: <Insights /> },
];

const createAndGenerate = [
  { label: 'Create image', icon: <ImageOutlined /> },
  { label: 'Generate Audio', icon: <GraphicEq /> },
  { label: 'Create video', icon: <Videocam /> },
  { label: 'Create slides', icon: <Slideshow /> },
  { label: 'Create Infographs', icon: <Insights /> },
  { label: 'Create quiz', icon: <QuizOutlined /> },
  { label: 'Create Flashcards', icon: <StyleOutlined /> },
  { label: 'Create Mind map', icon: <BubbleChartOutlined /> },
];

const analyzeAndWrite = [
  { label: 'Analyze Data', icon: <Insights /> },
  { label: 'Write content', icon: <EditNote /> },
  { label: 'Code Generation', icon: <Code /> },
  { label: 'Document Analysis', icon: <Description /> },
  { label: 'Translate', icon: <Translate /> },
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
      <Box sx={{ p: 1.5, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ letterSpacing: 0.6 }}>
          QUICK ACTIONS
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        <Box sx={{ px: 2, py: 0.8 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            NAVIGATION & TOOLS
          </Typography>
        </Box>
        <List dense>
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ borderRadius: 2, mx: 1, py: 0.6 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>{action.icon}</ListItemIcon>
                  <ListItemText primary={action.label} primaryTypographyProps={{ variant: 'body2', sx: { fontSize: 12 } }} />
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </List>

        <Box sx={{ px: 2, py: 1.2 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            CREATE & GENERATE
          </Typography>
        </Box>
        <List dense>
          {createAndGenerate.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05, duration: 0.2 }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ borderRadius: 2, mx: 1, py: 0.6 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>{action.icon}</ListItemIcon>
                  <ListItemText primary={action.label} primaryTypographyProps={{ variant: 'body2', sx: { fontSize: 12 } }} />
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </List>

        <Box sx={{ px: 2, py: 1.2 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            ANALYZE & WRITE
          </Typography>
        </Box>
        <List dense>
          {analyzeAndWrite.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.05, duration: 0.2 }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ borderRadius: 2, mx: 1, py: 0.6 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>{action.icon}</ListItemIcon>
                  <ListItemText primary={action.label} primaryTypographyProps={{ variant: 'body2', sx: { fontSize: 12 } }} />
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </List>
      </Box>
    </Box>
  );
};