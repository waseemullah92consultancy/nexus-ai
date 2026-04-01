'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  useTheme,
  Grid,
  Button,
  Stack,
  Divider,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Send,
  AutoAwesome,
  SmartToy,
  MicNone,
  GraphicEq,
  VideocamOutlined,
  AttachFile,
  ImageOutlined,
  Add,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { addMessage, setActiveModel } from '@/store/slices/chatSlice';
import { useGetModelsQuery } from '@/store/api';
import { Message } from '@/types';

export default function ChatPage() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, activeModel, isLoading } = useAppSelector((state) => state.chat);
  const { data: models } = useGetModelsQuery();
  const [input, setInput] = useState('');

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

  const selectedModel = models?.find((m) => m.id === activeModel);
  const userOptions = ['Just me', 'My team', 'My company', 'My customers', 'Students', 'Anyone / public'];
  const promptChips = [
    'Monitor the situation',
    'Create a prototype',
    'Build a business plan',
    'Create content',
    'Analyze & research',
    'Learn something',
  ];
  const quickIdeasLeft = [
    'Help me find the best AI model for my project',
    'Generate realistic images for my marketing campaign',
    'Create AI agents for workflow automation',
  ];
  const quickIdeasRight = [
    'I want to build an AI chatbot for my website',
    'Analyze documents and extract key information',
    'Add voice and speech recognition to my app',
  ];

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 1.2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <SmartToy color="primary" />
          <Box>
            <Typography variant="body2" fontWeight={600}>
              {selectedModel?.name || 'Create an image for me'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Discovery chat flow
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', p: 2.5 }}>
        {messages.length === 0 ? (
          <Box sx={{ maxWidth: 780, mx: 'auto' }}>
            <Paper sx={{ p: 2, mb: 1.5, borderRadius: 3 }}>
              <Typography variant="body2">
                Great choice! <b>Create an image for me</b> — I can already think of some excellent models for that.
              </Typography>
              <Typography variant="body2" sx={{ mt: 1.5 }}>
                Now, quick question:
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, borderRadius: 3 }}>
              <Typography variant="caption" color="primary.main" fontWeight={700}>
                ✦ WHO IT&apos;S FOR
              </Typography>
              <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5 }}>
                Who will be using this AI?
              </Typography>
              <Grid container spacing={1.2} sx={{ mt: 0.5 }}>
                {userOptions.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item}>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        justifyContent: 'flex-start',
                        borderRadius: 2,
                        py: 1.2,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    >
                      {item}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        ) : (
          messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Paper sx={{ p: 2, mb: 1.2, maxWidth: 840, mx: 'auto', borderRadius: 3 }}>
                <Typography variant="body2">{message.content}</Typography>
              </Paper>
            </motion.div>
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Box
        sx={{
          px: 2.5,
          pb: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Paper
          sx={{
            maxWidth: 980,
            mx: 'auto',
            borderRadius: 1.5,
            border: `1px solid ${theme.palette.divider}`,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 1.1 }}>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Describe your project, ask a question, or just say hi — I’m here to help."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              InputProps={{ disableUnderline: true }}
            />
          </Box>
          <Divider />
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 1.2, py: 0.7 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <MicNone sx={{ fontSize: 16, color: 'text.secondary' }} />
              <GraphicEq sx={{ fontSize: 16, color: 'text.secondary' }} />
              <VideocamOutlined sx={{ fontSize: 16, color: 'text.secondary' }} />
              <AttachFile sx={{ fontSize: 16, color: 'text.secondary' }} />
              <ImageOutlined sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Add sx={{ fontSize: 16, color: 'text.secondary' }} />
            </Stack>
            <Typography variant="caption" color="text.secondary">
              GPT-5.4 •
            </Typography>
            <Box sx={{ ml: 'auto', mr: -0.4 }}>
              <IconButton
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  width: 30,
                  height: 30,
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
              >
                <Send sx={{ fontSize: 15 }} />
              </IconButton>
            </Box>
          </Stack>

          <Stack direction="row" spacing={0.7} flexWrap="wrap" sx={{ px: 0.6, py: 0.9 }}>
            <Chip size="small" icon={<AutoAwesome />} label="88 Use cases" sx={{ bgcolor: '#171717', color: '#fff' }} />
            {promptChips.map((chip) => (
              <Chip key={chip} size="small" label={chip} variant="outlined" />
            ))}
          </Stack>

          <Grid container sx={{ px: 1.2, pb: 1.1 }}>
            <Grid item xs={12} md={6}>
              {quickIdeasLeft.map((idea) => (
                <Typography key={idea} variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.35 }}>
                  • {idea}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} md={6}>
              {quickIdeasRight.map((idea) => (
                <Typography key={idea} variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.35 }}>
                  • {idea}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}