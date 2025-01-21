import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import SitemarkIcon from '../components/SitemarkIcon';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const ScrollableBox = styled(Box)(({ theme }) => ({
    maxHeight: '150px',
    overflowY: 'auto',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    border: `1px solid ${theme.palette.divider}`,
    ...theme.applyStyles('dark', {
        backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        border: `1px solid hsla(220, 30%, 5%, 0.5)`,
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: '100vh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignUp(props) {
    const [checkedStates, setCheckedStates] = React.useState({
        terms1: false,
        terms2: false,
        terms3: false,
    });

    const handleCheckboxChange = (event, key) => {
        setCheckedStates((prev) => ({ ...prev, [key]: event.target.checked }));
    };

    const allChecked = Object.values(checkedStates).every(Boolean);

    const handleSignUpClick = (event) => {
        if (!allChecked) {
            event.preventDefault(); // 링크 기본 동작 막기
            alert('모든 약관에 동의해야 회원가입이 가능합니다.'); // 동의하지 않으면 팝업
        }
    };

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <SignUpContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <SitemarkIcon />
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        약관동의
                    </Typography>
                    {[
                        { key: 'terms1', text: '스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트스크롤 테스트' },
                        { key: 'terms2', text: '제2조: 개인정보 처리 방침 내용입니다. ... (생략 가능)' },
                        { key: 'terms3', text: '제3조: 기타 규정 및 조건 내용입니다. ... (생략 가능)' },
                    ].map((terms) => (
                        <Box key={terms.key} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <ScrollableBox>
                                <Typography variant="body2">{terms.text}</Typography>
                            </ScrollableBox>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkedStates[terms.key]}
                                        onChange={(event) => handleCheckboxChange(event, terms.key)}
                                    />
                                }
                                label={`동의`}
                            />
                        </Box>
                    ))}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        component={Link}
                        to="/signup"  
                        onClick={handleSignUpClick} 
                    >
                        회원가입
                    </Button>
            </Card>
        </SignUpContainer>
        </AppTheme >
    );
}
