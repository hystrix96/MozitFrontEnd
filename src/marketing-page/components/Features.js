import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import MuiChip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import PersonOffRoundedIcon from '@mui/icons-material/PersonOffRounded';
import ContactEmergencyRoundedIcon from '@mui/icons-material/ContactEmergencyRounded';
import SmokeFreeRoundedIcon from '@mui/icons-material/SmokeFreeRounded';

const items = [
  {
    icon: <SmokeFreeRoundedIcon />,
    title: '유해요소',
    description:
      '아동 및 청소년에게 유해한 요소를 자동으로 차단하여 안전한 영상을 제공합니다.',
    image1: `url("/assets/img/brand/blood1.jpg")`, // 공통 이미지
    image2: `url("/assets/img/brand/blood2.jpg")`,
  },
  {
    icon: <ContactEmergencyRoundedIcon />,
    title: '개인정보',
    description:
      '민증, 여권 등 개인정보가 포함된 콘텐츠를 자동으로 모자이크 처리하여 개인정보 유출을 방지합니다.',
    image1: `url("/assets/img/brand/roadsign1.jpg")`, // 공통 이미지
    image2: `url("/assets/img/brand/roadsign2.jpg")`,
  },
  {
    icon: <PersonOffRoundedIcon />,
    title: '인물',
    description:
      '사용자가 선택한 인물을 자동으로 모자이크 처리하여 개인의 프라이버시를 보호하는 서비스를 제공합니다.',
    image1: `url("/assets/img/brand/cha1.png")`, // 공통 이미지
    image2: `url("/assets/img/brand/cha2.png")`,
  },
];

const Chip = styled(MuiChip)(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        background:
          'linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))',
        color: 'hsl(0, 0%, 100%)',
        borderColor: (theme.vars || theme).palette.primary.light,
        '& .MuiChip-label': {
          color: 'hsl(0, 0%, 100%)',
        },
        ...theme.applyStyles('dark', {
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));

function MobileLayout({ selectedItemIndex, handleItemClick, selectedFeature }) {
  if (!items[selectedItemIndex]) {
    return null;
  }

  return (
    <Box
      sx={{
        display: { xs: 'flex', sm: 'none' },
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, overflow: 'auto' }}>
        {items.map(({ title }, index) => (
          <Chip
            size="medium"
            key={index}
            label={title}
            onClick={() => handleItemClick(index)}
            selected={selectedItemIndex === index}
          />
        ))}
      </Box>
      <Card variant="outlined">
        <Box
          sx={(theme) => ({
            mb: 2,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            minHeight: 280,
            backgroundImage: items[selectedItemIndex].image, // 공통 이미지 사용
          })}
        />
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography
            gutterBottom
            sx={{ color: 'text.primary', fontWeight: 'medium' }}
          >
            {selectedFeature.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
            {selectedFeature.description}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

MobileLayout.propTypes = {
  handleItemClick: PropTypes.func.isRequired,
  selectedFeature: PropTypes.shape({
    description: PropTypes.string.isRequired,
    icon: PropTypes.element,
    image: PropTypes.string.isRequired, // image 속성으로 변경
    title: PropTypes.string.isRequired,
  }).isRequired,
  selectedItemIndex: PropTypes.number.isRequired,
};

export { MobileLayout };

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box sx={{ width: { sm: '100%', md: '95%' } }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          서비스 특징
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}
        >
          Mozit은 영상 속 유해 요소, 개인정보, 인물 등을 자동으로 모자이크 처리해주는 서비스입니다. 
          AI 기반 기술로 민감한 정보를 빠르고 정확하게 보호하며, 직관적인 인터페이스로 누구나 쉽게 안전한 영상 콘텐츠를 제작할 수 있습니다.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row-reverse' },
          gap: 2,
        }}
      >
        <div>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 2,
              height: '100%',
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Box
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                  (theme) => ({
                    p: 2,
                    height: '100%',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: (theme.vars || theme).palette.action.hover,
                    },
                  }),
                  selectedItemIndex === index && {
                    backgroundColor: 'action.selected',
                  },
                ]}
              >
                <Box
                  sx={[
                    {
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'left',
                      gap: 1,
                      textAlign: 'left',
                      textTransform: 'none',
                      color: 'text.secondary',
                    },
                    selectedItemIndex === index && {
                      color: 'text.primary',
                    },
                  ]}
                >
                  {icon}

                  <Typography variant="h6">{title}</Typography>
                  <Typography variant="body2">{description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <MobileLayout
            selectedItemIndex={selectedItemIndex}
            handleItemClick={handleItemClick}
            selectedFeature={selectedFeature}
          />
        </div>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            width: { xs: '100%', md: '70%' },
            height: 'var(--items-image-height)',
          }}
        >
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              pointerEvents: 'none',
            }}
          >
            {/* 좌우 분할 이미지 */}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
              }}
            >
              {/* 좌측 이미지 */}
              <Box
                sx={{
                  width: '50%',
                  height: '100%',
                  backgroundImage: items[selectedItemIndex].image1,
                  backgroundSize: '200% 100%', // 가로 방향으로 2배 확대
                  backgroundPosition: 'left', // 왼쪽 절반만 표시
                }}
              />

              {/* 우측 이미지 */}
              <Box
                sx={{
                  width: '50%',
                  height: '100%',
                  backgroundImage: items[selectedItemIndex].image2,
                  backgroundSize: '200% 100%', // 가로 방향으로 2배 확대
                  backgroundPosition: 'right', // 오른쪽 절반만 표시
                }}
              />

              {/* 중앙 분할 선 */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '2px',
                  height: '100%',
                  backgroundColor: 'black',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              />
            </Box>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
