'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Avatar,
  Chip,
  useTheme,
  Fade,
} from '@mui/material';
import { Send, AutoAwesome, SmartToy, Person } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { addMessage, setActiveModel, clearMessages } from '@/store/slices/chatSlice';
import { useGetModelsQuery } from '@/store/api';
import { Message } from '@/types';

const ONBOARDING_KEY = 'nexusai-onboarding-complete';

export default function ChatPage() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, activeModel, isLoading } = useAppSelector((state) => state.chat);
  const { data: models } = useGetModelsQuery();
  const [input, setInput] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem(ONBOARDING_KEY);
    if (!completed) {
      setShowOnboarding(true);
    }
  }, []);

  useEffect(() => {
    if (models && models.length > 0 && !activeModel) {
      dispatch(setActiveModel(models[0].id));
    }
  }, [models, activeModel, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    dispatch(addMessage(userMessage));
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you said: "${input.trim()}". This is a simulated response. In production, this would be connected to an actual AI model.`,
        timestamp: new Date(),
        model: activeModel || undefined,
      };
      dispatch(addMessage(aiMessage));
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setShowOnboarding(false);
  };

  const selectedModel = models?.find((m) => m.id === activeModel);

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Onboarding Modal */}
      <AnimatePresence>
        {showOnboarding && (
          <Fade in={showOnboarding}>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <Paper sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
                  <AutoAwesome sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    Welcome to NexusAI
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Start exploring AI models by selecting one from the sidebar and sending your first message.
                  </Typography>
                  <Chip
                    label="Start Chatting"
                    color="primary"
                    onClick={completeOnboarding}
                    sx={{ cursor: 'pointer' }}
                  />
                </Paper>
              </motion.div>
            </Box>
          </Fade>
        )}
      </AnimatePresence>

      {/* Chat Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SmartToy color="primary" />
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {selectedModel?.name || 'Select a Model'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {selectedModel?.description.slice(0, 50)}...
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {messages.length === 0 ? (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AutoAwesome sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Start a conversation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Type a message below to begin
            </Typography>
          </Box>
        ) : (
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 2,
                    flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: message.role === 'user' ? 'secondary.main' : 'primary.main',
                    }}
                  >
                    {message.role === 'user' ? <Person /> : <SmartToy />}
                  </Avatar>
                  <Paper
                    sx={{
                      p: 2,
                      maxWidth: '70%',
                      backgroundColor:
                        message.role === 'user'
                          ? theme.palette.primary.main + '20'
                          : theme.palette.background.paper,
                    }}
                  >
                    <Typography variant="body1">{message.content}</Typography>
                  </Paper>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
            disabled={isLoading}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            sx={{ alignSelf: 'flex-end' }}
          >
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}