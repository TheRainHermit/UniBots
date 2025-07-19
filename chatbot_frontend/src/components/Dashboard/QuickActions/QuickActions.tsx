import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Paper } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';

const actions = [
  {
    label: 'Certificado de Notas',
    icon: <DescriptionIcon sx={{ color: '#2962ff', fontSize: 40 }} />,
    route: '/certificado-notas',
  },
  {
    label: 'Horario Actual',
    icon: <AccessTimeIcon sx={{ color: '#43a047', fontSize: 40 }} />,
    route: '/horario-actual',
  },
  {
    label: 'Estado Financiero',
    icon: <AttachMoneyIcon sx={{ color: '#fbc02d', fontSize: 40 }} />,
    route: '/estado-financiero',
  },
  {
    label: 'Evaluación Docente',
    icon: <PeopleIcon sx={{ color: '#8e24aa', fontSize: 40 }} />,
    route: '/evaluacion-docente',
  },
];

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Acciones Rápidas
      </Typography>
      <Grid container spacing={3}>
        {actions.map((action) => (
          <Grid item xs={12} sm={6} md={3} key={action.label}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: 6 },
              }}
              onClick={() => navigate(action.route)}
            >
              {action.icon}
              <Typography sx={{ mt: 2 }} align="center">
                {action.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuickActions;