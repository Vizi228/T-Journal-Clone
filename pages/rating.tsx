import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core';

import { MainLayout } from '../layouts/MainLayout';
import { FollowButton } from '../components/FollowButton';
import { Api } from '../utils/api';
import { NextPage } from 'next';
import { ResponseUser } from '../utils/api/types';

interface RatingProps {
  users: ResponseUser[],
}

const Rating: NextPage<RatingProps> = ({ users }) => {
  console.log(users)
  return (
    <MainLayout hideComments>
      <Paper className="pl-20 pt-20 pr-20 mb-20" elevation={0}>
        <Typography variant="h5" style={{ fontWeight: 'bold', fontSize: 30, marginBottom: 6 }}>
          Рейтинг сообществ и блогов
        </Typography>
        <Typography style={{ fontSize: 15 }}>
          Десять лучших авторов и комментаторов, а также администраторы первых десяти сообществ из
          рейтинга по итогам месяца бесплатно получают Plus-аккаунт на месяц.
        </Typography>
        <Tabs className="mt-10" value={0} indicatorColor="primary" textColor="primary">
          <Tab label="Август" />
          <Tab label="За 3 месяцуа" />
          <Tab label="За всё время" />
        </Tabs>
      </Paper>

      <Paper elevation={0}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Имя пользователя</TableCell>
              <TableCell align="right">Рейтинг</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((item, i) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  <span className="mr-15">{i + 1}</span>{item.fullName}
                </TableCell>
                <TableCell align="right">640</TableCell>
                <TableCell align="right">
                  <FollowButton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </MainLayout>
  );
}

export default Rating

export const getServerSideProps = async ctx => {
  try {
    const data = await Api().user.getAll();
    return {
      props: {
        users: data
      }
    }
  } catch (error) {
    console.log(error)
  }
  return {
    props: {
    }
  }
}