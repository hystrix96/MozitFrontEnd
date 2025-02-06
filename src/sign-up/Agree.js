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
        backgroundImage:
            'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        border: `1px solid hsla(220, 30%, 5%, 0.5)`,
    }),
    whiteSpace: 'pre-line',  // 줄바꿈과 띄어쓰기를 반영
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: '100vh',
    minHeight: '750px',
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
                    {[{
                        key: 'terms1',
                        text: `### 이용약관

**제1조 (목적)**  
본 약관은 Mozit(이하 "회사")이 제공하는 영상 모자이크 처리 서비스(이하 "서비스")의 이용 조건을 규정합니다.

**제2조 (정의)**  
- "서비스"는 기업 고객에게 제공되는 영상 모자이크 처리 서비스입니다.  
- "이용자"는 본 약관에 동의하고 서비스를 이용하는 기업 고객입니다.  
- "구독"은 월간 또는 연간 요금제를 통해 서비스 이용 계약을 체결하는 방식입니다.

**제3조 (서비스 내용)**  
- 회사는 이용자가 제공한 영상을 분석하여 모자이크 처리를 제공합니다.  
- 영상은 처리 후 즉시 삭제되며 저장되지 않습니다.  
- 서비스는 기업 고객 전용입니다.

**제4조 (이용계약 체결)**  
- 이용자는 구독 요금을 결제하고 신청서를 작성하여 계약을 체결합니다.  
- 회사는 신청을 승인하며, 정당한 사유 없이 거부하지 않습니다.

**제5조 (구독 요금 및 결제)**  
- 구독 요금은 월간 또는 연간 구독 방식으로 청구되며, 계약 해지 시 남은 기간에 대해 환불이 가능합니다.  
- 환불은 이용자가 서비스 이용을 중단한 후, 미사용 기간에 해당하는 금액만큼 환불됩니다.

**제6조 (개인정보 및 콘텐츠 보호)**  
- 업로드된 영상은 처리 목적으로만 사용되며, 처리 후 즉시 삭제됩니다.  
- 개인정보 보호는 회사의 개인정보처리방침을 따릅니다.

**제7조 (이용자의 의무)**  
- 이용자는 불법적 콘텐츠를 업로드하지 않으며, 저작권 문제는 이용자가 책임집니다.

**제8조 (회사의 책임 제한)**  
- 회사는 모자이크 처리의 완벽성을 보장하지 않으며, 그로 인한 손해에 책임지지 않습니다.

**제9조 (계약 해지 및 서비스 중단)**  
- 이용자는 해지 신청 후, 다음 결제 주기에 구독이 해지됩니다.  
- 회사는 기술적 문제로 서비스를 중단할 수 있습니다.

**제10조 (기타)**  
- 본 약관에 명시되지 않은 사항은 관련 법령을 따르며, 회사는 약관을 개정할 수 있습니다.` 
                    }, {
                        key: 'terms2',
                        text: `### 개인정보 처리방침


**제1조 개인정보 수집 및 이용 목적**  
회사는 다음 목적을 위해 개인정보를 수집합니다:  
- 서비스 제공 및 이용자 본인 확인  
- 고객 관리 및 지원  
- 결제 및 구독 관리

**제2조  수집하는 개인정보 항목**  
회사는 최소한의 개인정보만 수집합니다:  
- 필수 정보: 기업명, 담당자 이름, 이메일, 연락처
- 서비스 이용 중 수집되는 정보: 업로드된 영상 (모자이크 처리 후 즉시 삭제됨)

**제3조  개인정보 보유 및 이용 기간**  
- 개인정보는 목적 달성 후 즉시 파기됩니다.  
- 업로드된 영상은 처리 후 즉시 삭제됩니다.

**제4조  개인정보 파기 절차 및 방법**  
- 수집된 개인정보는 목적 달성 후 즉시 파기됩니다.  
- 전자적 파일은 복구할 수 없는 방법으로 영구 삭제합니다.  
- 종이는 분쇄하거나 소각합니다.

**제5조  개인정보 제3자 제공**  
회사는 원칙적으로 개인정보를 제3자에게 제공하지 않으며, 법령에 의한 요구나 이용자의 동의가 있을 경우에만 예외로 제공합니다.

**제6조  개인정보 처리의 위탁**  
회사는 서비스 운영을 위해 개인정보 처리를 외부 업체에 위탁할 수 있으며, 위탁 사항은 사전 고지됩니다.

**제7조  이용자의 권리와 행사 방법**  
이용자는 언제든지 개인정보에 대해 열람, 정정, 삭제 및 처리 정지를 요청할 수 있습니다.  
요청은 회사 이메일(privacy@mozit.co.kr)을 통해 접수 가능합니다.

**제8조 개인정보 보호를 위한 기술적·관리적 대책**  
회사는 개인정보 보호를 위해 암호화 및 접근 통제 등 기술적 조치를 취합니다.

**제9조 개인정보 보호책임자**  
개인정보 관련 문의는 개인정보 보호책임자에게 연락할 수 있습니다.  
- 이메일: privacy@mozit.co.kr  
- 전화번호: (070) - **** - ****

**제10조  개인정보 처리방침 변경**  
회사는 방침을 개정할 수 있으며, 변경 사항은 웹사이트 또는 이메일을 통해 공지합니다.`
                    }].map((terms) => (
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
        </AppTheme>
    );
}
