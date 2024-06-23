import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../ducks';

export default function Events() {
  const events = useAppSelector((state) => state.events);

  return (
    <>
      <Typography variant='h5' color='white' marginY={1}>
        Events
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 373 }}>
        <Table aria-label='Events table'>
          <TableHead>
            <TableRow>
              <TableCell>Event type</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow
                key={event.type + '-' + event.timestamp}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{event.type}</TableCell>
                <TableCell>
                  {new Date(event.timestamp).toLocaleString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
