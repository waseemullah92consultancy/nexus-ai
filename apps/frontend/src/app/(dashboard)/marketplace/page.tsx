'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
  useTheme,
  Drawer,
  Card,
  CardContent,
  Rating,
} from '@mui/material';
import { Search, Star } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useGetModelsQuery, useGetLabsQuery } from '@/store/api';
import { ModelCard, LoadingSpinner } from '@/components/common';
import { Model, Lab } from '@/types';
import { formatNumber, formatCurrency } from '@/utils';

export default function MarketplacePage() {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [lab, setLab] = useState('');
  const [category, setCategory] = useState('');
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  const { data: models, isLoading: modelsLoading } = useGetModelsQuery({
    lab: lab || undefined,
    category: category || undefined,
    search: search || undefined,
  });
  const { data: labs } = useGetLabsQuery();

  const categories = models ? Array.from(new Set(models.map((m) => m.category))) : [];

  const filteredModels = models?.filter((model) => {
    if (lab && model.labId !== lab) return false;
    if (category && model.category !== category) return false;
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        model.name.toLowerCase().includes(searchLower) ||
        model.description.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  if (modelsLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <Box sx={{ p: 3, height: 'calc(100vh - 64px)', overflow: 'auto' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Model Marketplace
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Discover and use AI models from leading research labs
        </Typography>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search models..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 200 }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Lab</InputLabel>
            <Select value={lab} label="Lab" onChange={(e) => setLab(e.target.value)}>
              <MenuItem value="">All Labs</MenuItem>
              {labs?.map((l) => (
                <MenuItem key={l.id} value={l.id}>
                  {l.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Active Filters */}
        {(lab || category || search) && (
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            {lab && (
              <Chip
                label={`Lab: ${labs?.find((l) => l.id === lab)?.name}`}
                onDelete={() => setLab('')}
              />
            )}
            {category && <Chip label={`Category: ${category}`} onDelete={() => setCategory('')} />}
            {search && <Chip label={`Search: ${search}`} onDelete={() => setSearch('')} />}
          </Box>
        )}

        {/* Models Grid */}
        <Grid container spacing={3}>
          {filteredModels?.map((model, index) => (
            <Grid item xs={12} sm={6} md={4} key={model.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                <ModelCard model={model} onClick={() => setSelectedModel(model)} />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {filteredModels?.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No models found
            </Typography>
          </Box>
        )}
      </motion.div>

      {/* Model Detail Drawer */}
      <Drawer
        anchor="right"
        open={!!selectedModel}
        onClose={() => setSelectedModel(null)}
        PaperProps={{
          sx: { width: 400, maxWidth: '100%' },
        }}
      >
        {selectedModel && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              {selectedModel.name}
            </Typography>

            <Chip label={selectedModel.lab} color="primary" size="small" sx={{ mb: 2 }} />

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {selectedModel.description}
            </Typography>

            <Card sx={{ mb: 2, backgroundColor: theme.palette.background.default }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Context Window
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {formatNumber(selectedModel.contextWindow)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Max Output
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {formatNumber(selectedModel.maxOutput)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Rating
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                    <Typography variant="body2" fontWeight={600}>
                      {selectedModel.rating}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Pricing
            </Typography>
            <Card sx={{ mb: 2, backgroundColor: theme.palette.background.default }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Input
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {formatCurrency(selectedModel.pricing.input)}/1K tokens
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Output
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {formatCurrency(selectedModel.pricing.output)}/1K tokens
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Features
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {selectedModel.features.map((feature) => (
                <Chip key={feature} label={feature} size="small" />
              ))}
            </Box>

            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Tags
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selectedModel.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}