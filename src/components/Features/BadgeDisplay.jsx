import GppGoodRoundedIcon from '@mui/icons-material/GppGoodRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';

const BadgeDisplay = ({ badges }) => {
  return !badges || badges.length === 0 ? null : (
    <div>
      {badges.map((badge) => {
        switch (badge.badgeId) {
          case 1:
            return (
              <WorkspacePremiumRoundedIcon
                key={badge.badgeId}
                sx={{ color: '#FDD94E' }}
                titleAccess={badge.name}
              />
            );
          case 2:
            return (
              <BadgeRoundedIcon
                key={badge.badgeId}
                sx={{ color: '#4285F4' }}
                titleAccess={badge.name}
              />
            );
          case 3:
            return (
              <GppGoodRoundedIcon
                key={badge.badgeId}
                sx={{ color: '#34A853' }}
                titleAccess={badge.name}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default BadgeDisplay;
