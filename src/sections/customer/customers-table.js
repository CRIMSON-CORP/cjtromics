import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onSelectAll,
    onSelectOne,
    page = 0,
    selected = [],
    rowsPerPage,
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>User</TableCell>
                <TableCell>Reference</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            {items.length === 0 && (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={13}>
                    <Stack justifyContent="center" direction="row">
                      <Typography variant="h4">No Users found</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}

            <TableBody>
              {items.map((user) => {
                const isSelected = selected.includes(user.id);
                return (
                  <TableRow
                    hover
                    key={user.id}
                    selected={isSelected}
                    sx={{
                      bgcolor: user.userActiveStatus === 1 ? '#7ae57a12' : '#e57a7a12',
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          event.stopPropagation();
                          if (event.target.checked) {
                            onSelectOne?.(user._id);
                          } else {
                            onDeselectOne?.(user._id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar src={user.avatar}>
                          {getInitials(`${user.first_name} ${user.last_name}`)}
                        </Avatar>
                        <Stack spacing={0.5}>
                          <Typography variant="subtitle1">
                            {user.first_name} {user.last_name}
                          </Typography>
                          <Typography variant="subtitle2">{user.email}</Typography>
                        </Stack>
                        <Chip label={user.privilege} sx={{ textTransform: 'capitalize' }} />
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{user.reference}</Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        {user.userActiveStatus === 1 ? (
                          <Button variant="contained" color="error">
                            Deactivate
                          </Button>
                        ) : (
                          <Button variant="contained" color="primary">
                            Activate
                          </Button>
                        )}
                        {user.privilege === 'user' ? (
                          <Button variant="contained" color="info">
                            Activate as Admin
                          </Button>
                        ) : (
                          <Button variant="contained" color="error">
                            Remove as Admin
                          </Button>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
