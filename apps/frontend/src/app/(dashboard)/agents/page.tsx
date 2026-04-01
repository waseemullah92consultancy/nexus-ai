'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Chip,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
  Alert,
  Snackbar,
} from '@mui/material';
import { Add, Code, Search, Edit, Analytics, Support } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  useCreateAgentFromTemplateMutation,
  useCreateAgentMutation,
  useGetAgentsQuery,
  useGetMyAgentsQuery,
} from '@/store/api';
import { AgentCard, LoadingSpinner } from '@/components/common';
import { Agent } from '@/types';

const iconMap: Record<string, React.ReactElement> = {
  Code: <Code />,
  Search: <Search />,
  Edit: <Edit />,
  Analytics: <Analytics />,
  Support: <Support />,
};

export default function AgentsPage() {
  const theme = useTheme();
  const { data: agents, isLoading } = useGetAgentsQuery();
  const { data: myAgents, isLoading: isMyAgentsLoading } = useGetMyAgentsQuery();
  const [createAgent, { isLoading: isCreating }] = useCreateAgentMutation();
  const [createFromTemplate, { isLoading: isCreatingFromTemplate }] =
    useCreateAgentFromTemplateMutation();

  const [tab, setTab] = useState<'templates' | 'mine'>('templates');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>(
    { open: false, message: '', severity: 'success' },
  );

  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'Custom',
    icon: 'Code',
    defaultModel: 'gpt-4o',
    systemPrompt: '',
    featuresCsv: '',
    tagsCsv: '',
  });

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  const list = tab === 'templates' ? agents : myAgents;
  const isListLoading = tab === 'mine' && isMyAgentsLoading;

  return (
    <Box sx={{ p: 3, height: 'calc(100vh - 64px)', overflow: 'auto' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Agent Templates
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Pre-configured agents ready to use or customize
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setShowDialog(true)}
          >
            Build from Scratch
          </Button>
        </Box>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ mb: 2 }}
        >
          <Tab value="templates" label="Templates" />
          <Tab value="mine" label="My Agents" />
        </Tabs>

        {/* Agent Templates Grid */}
        <Grid container spacing={3}>
          {(list || []).map((agent, index) => (
            <Grid item xs={12} sm={6} md={4} key={agent.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                <AgentCard agent={agent} onClick={() => setSelectedAgent(agent)} />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {!isListLoading && (list || []).length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No agents available
            </Typography>
          </Box>
        )}
      </motion.div>

      {/* Agent Detail Dialog */}
      <Dialog
        open={!!selectedAgent}
        onClose={() => setSelectedAgent(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedAgent && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: alpha(theme.palette.primary.main, 0.12),
                    color: theme.palette.primary.main,
                  }}
                >
                  {iconMap[selectedAgent.icon] || <Code />}
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {selectedAgent.name}
                  </Typography>
                  <Chip label={selectedAgent.category} size="small" />
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedAgent.description}
              </Typography>

              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                Features
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                {selectedAgent.features.map((feature) => (
                  <Chip key={feature} label={feature} size="small" />
                ))}
              </Box>

              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                Default Model
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedAgent.defaultModel}
              </Typography>

              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                System Prompt
              </Typography>
              <Card sx={{ backgroundColor: theme.palette.background.default }}>
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}
                  >
                    {selectedAgent.systemPrompt}
                  </Typography>
                </CardContent>
              </Card>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedAgent(null)}>Cancel</Button>
              <Button
                variant="contained"
                disabled={isCreatingFromTemplate}
                onClick={async () => {
                  try {
                    await createFromTemplate(selectedAgent.id).unwrap();
                    setToast({ open: true, severity: 'success', message: 'Agent created from template' });
                    setSelectedAgent(null);
                    setTab('mine');
                  } catch (e) {
                    setToast({ open: true, severity: 'error', message: 'Failed to create agent from template' });
                  }
                }}
              >
                Use Template
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Build from Scratch Dialog */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Build Custom Agent</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              fullWidth
            />
            <TextField
              label="Description"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              fullWidth
              multiline
              minRows={2}
            />
            <TextField
              label="Category"
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              fullWidth
            />
            <TextField
              label="Icon (Code, Search, Edit, Analytics, Support)"
              value={form.icon}
              onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
              fullWidth
            />
            <TextField
              label="Default model slug (e.g. gpt-4o)"
              value={form.defaultModel}
              onChange={(e) => setForm((p) => ({ ...p, defaultModel: e.target.value }))}
              fullWidth
            />
            <TextField
              label="System prompt"
              value={form.systemPrompt}
              onChange={(e) => setForm((p) => ({ ...p, systemPrompt: e.target.value }))}
              fullWidth
              multiline
              minRows={4}
            />
            <TextField
              label="Features (comma separated)"
              value={form.featuresCsv}
              onChange={(e) => setForm((p) => ({ ...p, featuresCsv: e.target.value }))}
              fullWidth
            />
            <TextField
              label="Tags (comma separated)"
              value={form.tagsCsv}
              onChange={(e) => setForm((p) => ({ ...p, tagsCsv: e.target.value }))}
              fullWidth
            />
            <Alert severity="info">
              Agents are saved to your account and stored in JSON (no database).
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            disabled={isCreating}
            onClick={async () => {
              try {
                const features = form.featuresCsv
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean);
                const tags = form.tagsCsv
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean);

                await createAgent({
                  name: form.name,
                  description: form.description,
                  category: form.category,
                  icon: form.icon,
                  defaultModel: form.defaultModel,
                  systemPrompt: form.systemPrompt,
                  features,
                  tags,
                }).unwrap();

                setToast({ open: true, severity: 'success', message: 'Agent created' });
                setShowDialog(false);
                setTab('mine');
                setForm({
                  name: '',
                  description: '',
                  category: 'Custom',
                  icon: 'Code',
                  defaultModel: 'gpt-4o',
                  systemPrompt: '',
                  featuresCsv: '',
                  tagsCsv: '',
                });
              } catch {
                setToast({ open: true, severity: 'error', message: 'Failed to create agent' });
              }
            }}
          >
            Create Agent
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toast.severity} onClose={() => setToast((p) => ({ ...p, open: false }))}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}