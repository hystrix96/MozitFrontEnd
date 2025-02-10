import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import { Container, Typography, Box } from '@mui/material';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import SitemarkIcon from '../components/SitemarkIcon';
import Divider from '@mui/material/Divider';
import Footer from '../components/Footer';


export default function TermOfServicePage(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SitemarkIcon sx={{ position: 'absolute', top: '2rem', left: '2rem' }}/>
      <Container maxWidth="md" sx={{ py: 4, mt:12}}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            이용약관
          </Typography>
          <Typography variant="body2" color="text.secondary" align="right">
            마지막 업데이트: 2025년 1월 22일
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            제1조 (목적)
          </Typography>
          <Typography variant="body1" paragraph>
            본 약관은 Mozit(이하 "회사")이 제공하는 영상 모자이크 처리 서비스(이하 "서비스")의 이용 조건 및 절차, 회사와 고객 간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            제2조 (정의)
          </Typography>
          <Typography variant="body1" paragraph>
            "서비스"란 회사가 기업 고객을 대상으로 제공하는 영상 모자이크 처리 서비스를 의미합니다.
            "이용자"란 본 약관에 동의하고 회사가 제공하는 서비스를 이용하는 기업 고객을 의미합니다.
            "구독"이란 이용자가 월간 또는 연간 요금제를 통해 서비스를 정기적으로 이용할 수 있는 계약을 의미합니다.
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            제3조 (서비스 내용)
          </Typography>
          <Typography variant="body1" paragraph>
            회사는 이용자가 제공한 영상을 분석하여 지정된 영역에 모자이크 처리를 제공합니다.
            업로드된 모든 영상은 업로드 후 1일(24시간) 뒤에 삭제되며, 회사는 영상을 저장하거나 보관하지 않습니다.
            서비스는 기업 고객 전용으로 제공되며, 개인 고객은 이용할 수 없습니다.
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            제4조 (이용계약 체결)
          </Typography>
          <Typography variant="body1" paragraph>
            이용자는 회사의 서비스 이용 신청서를 작성하고 구독 요금을 결제함으로써 이용 계약을 체결합니다.
            회사는 신청 내용을 검토한 후 승인 여부를 결정하며, 정당한 사유 없이 승인을 거부하지 않습니다.
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            제5조 (구독 요금 및 결제)
          </Typography>
          <Typography variant="body1" paragraph>
            서비스 이용 요금은 월간 또는 연간 구독 방식으로 청구됩니다.
            이용자는 회사가 지정한 결제 방식을 통해 구독 요금을 결제해야 합니다.
            환불은 이용자가 서비스 이용을 중단한 후, 미사용 기간에 해당하는 금액만큼 환불됩니다.
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            제6조 (개인정보 및 콘텐츠 보호)
          </Typography>
          <Typography variant="body1" paragraph>
            회사는 이용자가 업로드한 영상을 처리 목적으로만 사용하며, 업로드 후 1일(24시간) 뒤에 삭제합니다.
            회사는 이용자의 영상 데이터를 제3자에게 제공하거나 내부 테스트에 사용하지 않습니다.
            개인정보 보호와 관련된 세부 사항은 회사의 개인정보처리방침에 따릅니다.
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            제7조 (이용자의 의무)
          </Typography>
          <Typography variant="body1" paragraph>
            이용자는 불법적이거나 부적절한 콘텐츠를 업로드하지 않아야 합니다.
            서비스 이용 과정에서 발생하는 모든 콘텐츠의 저작권 문제는 이용자가 책임집니다.
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            제8조 (회사의 책임 제한)
          </Typography>
          <Typography variant="body1" paragraph>
            회사는 기술적 한계로 인해 모자이크 처리의 완벽성을 보장하지 않으며, 이에 따른 손해에 대해 책임지지 않습니다.
            회사는 이용자의 콘텐츠 업로드 및 사용 과정에서 발생하는 법적 분쟁에 대해 책임을 지지 않습니다.
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            제9조 (계약 해지 및 서비스 중단)
          </Typography>
          <Typography variant="body1" paragraph>
            이용자가 구독 해지를 원하는 경우, 회사에 해지 신청을 해야 하며, 구독 해지는 다음 결제 주기에 적용됩니다.
            회사는 불가피한 기술적 문제나 서비스 운영상의 이유로 서비스를 일시 중단하거나 종료할 수 있으며, 이 경우 이용자에게 사전 통지합니다.
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            제10조 (기타)
          </Typography>
          <Typography variant="body1" paragraph>
            본 약관에 명시되지 않은 사항은 관련 법령 및 상관례에 따릅니다.
            회사는 필요 시 약관을 개정할 수 있으며, 개정된 약관은 이용자에게 통지 후 효력이 발생합니다.
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" paragraph>
            본 약관은 2025년 1월 22일부터 시행됩니다.
          </Typography>
        </Box>
      </Container>
        <Divider />
        <Footer/>
    </AppTheme>
  );
}
