'use client';

import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  DarkMode,
  LightMode,
  NotificationsOutlined,
  Search,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useThemeMode } from '@/theme';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { signout } from '@/store/slices/authSlice';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

const navLinks = [
  { label: 'Chat', href: '/chat' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Agents', href: '/agents' },
  { label: 'Discover', href: '/discover' },
];

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = async () => {
    handleMenuClose();
    await dispatch(signout());
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton edge="start" onClick={onToggleSidebar} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>

          <Link href="/" passHref style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #f59e0b 0%, #2dd4bf 100%)'
                  : 'linear-gradient(135deg, #b45309 0%, #0f766e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              NexusAI
            </Typography>
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} passHref style={{ textDecoration: 'none' }}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  sx={{
                    color: pathname === link.href ? 'primary.main' : 'text.secondary',
                    fontWeight: pathname === link.href ? 600 : 400,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'primary.main',
                    },
                  }}
                >
                  {link.label}
                </Button>
              </motion.div>
            </Link>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton >
            <Search sx={{  color: 'primary.main'}}/>
          </IconButton>

          <IconButton>
            <NotificationsOutlined sx={{  color: 'primary.main'}}/>
          </IconButton>

          <IconButton onClick={toggleTheme} sx={{  color: 'primary.main'}}>
            {mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>

          {user ? (
            <>
              <IconButton onClick={handleMenuOpen}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'primary.main',
                    fontSize: 14,
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Typography variant="body2">{user.name}</Typography>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
              </Menu>
            </>
          ) : (
            <Link href="/signin" passHref style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="small">
                Sign In
              </Button>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};