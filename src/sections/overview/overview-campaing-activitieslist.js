import { Campaign } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export const OverviewCampaignActivitieList = ({ activities = [], sx }) => {
  return (
    <Card sx={sx}>
      <CardHeader title="Campaign activities" />
      <List sx={{ maxHeight: '50vh', overflow: 'auto' }}>
        {activities.map((campaing, index) => {
          const hasDivider = index < activities.length - 1;
          const ago = formatDistanceToNow(new Date(campaing.timeAgo));
          return (
            <ListItem divider={hasDivider} key={campaing.id}>
              <ListItemAvatar>
                <SvgIcon>
                  <Campaign />
                </SvgIcon>
              </ListItemAvatar>
              {console.log(new Date(campaing.timeAgo).getTime())}
              <ListItemText
                primary={campaing.activity}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`${campaing.timeAgo} (${ago})`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Card>
  );
};

OverviewCampaignActivitieList.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object,
};
