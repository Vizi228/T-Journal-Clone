import { Button, Divider, Paper, Typography } from '@material-ui/core';
import { MainLayout } from '../../layouts/MainLayout';
import SettingsForm from '../../components/SettingsForm';


export default function Settings() {
  return (
    <MainLayout hideComments>
      <Paper className="p-20" elevation={0}>
        <Typography variant="h6">Основные настройки</Typography>
        <Divider className="mt-20 mb-30" />
        <SettingsForm />
      </Paper>
    </MainLayout>
  );
}
