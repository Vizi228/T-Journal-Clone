import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogContentText, Divider, TextField, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import styles from './AuthDialogs.module.scss';
import MainForm from './Forms/main';
import LoginForm from './Forms/login';
import RegisterForm from './Forms/register';

interface AuthDialogProps {
  onClose: () => void;
  visible: boolean;
}

const AuthDialogs: React.FC<AuthDialogProps> = ({ onClose, visible }) => {
  const [formType, setFormType] = React.useState<'main' | 'register' | 'login'>('main');
  return (
    <Dialog open={visible} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <DialogContentText>
          <div className={styles.content}>
            {formType === 'main' && (
              <MainForm onOpenLogin={() => setFormType('login')} />
            )}
            {formType === 'login' && (
              <LoginForm onOpenMain={() => setFormType('main')} onOpenRegister={() => setFormType('register')} />
            )}
            {formType === 'register' && (
              <RegisterForm onOpenLogin={() => setFormType('login')} onOpenMain={() => setFormType('main')} />
            )}
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>

  )
}
export default AuthDialogs