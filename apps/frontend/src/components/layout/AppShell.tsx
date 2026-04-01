'use client';

import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { RightPanel } from './RightPanel';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { toggleSidebar, toggleRightPanel } from '@/store/slices/uiSlice';

const SIDEBAR_WIDTH = 280;
const RIGHT_PANEL_WIDTH = 280;
const NAVBAR_HEIGHT = 64;

interface AppShellProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showRightPanel?: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  showSidebar = true,
  showRightPanel = true,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { sidebarOpen, rightPanelOpen } = useAppSelector((state) => state.ui);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleToggleRightPanel = () => {
    dispatch(toggleRightPanel());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Navbar onToggleSidebar={handleToggleSidebar} />

      <Box sx={{ display: 'flex', flex: 1, marginTop: `${NAVBAR_HEIGHT}px` }}>
        <AnimatePresence>
          {showSidebar && isAuthenticated && sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: SIDEBAR_WIDTH, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden' }}
            >
              <Box sx={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}>
                <Sidebar />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        <Box
          component="main"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
            overflow: 'auto',
          }}
        >
          {children}
        </Box>

        <AnimatePresence>
          {showRightPanel && isAuthenticated && rightPanelOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: RIGHT_PANEL_WIDTH, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden' }}
            >
              <Box sx={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}>
                <RightPanel />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};