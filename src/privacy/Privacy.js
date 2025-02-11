import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import { Container, Typography, Box } from '@mui/material';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import SitemarkIcon from '../components/SitemarkIcon';
import Divider from '@mui/material/Divider';
import Footer from '../components/Footer';

export default function Privacy(props) {
 

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SitemarkIcon sx={{ position: 'absolute', top: '2rem', left: '2rem' }}/>
      <Container maxWidth="md" sx={{ py: 4, mt: 12 }}>
        <Box sx={{ mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Mozit 개인정보 처리방침
      </Typography>
      <Typography variant="body2" color="text.secondary" align="right">
                    마지막 업데이트: 2025년 2월 10일
        </Typography>
      </Box>
        
        
      <Typography variant="body1" paragraph>
        Mozit(이하 "회사")은 이용자의 개인정보를 중요하게 생각하며, 「개인정보 보호법」 및 관련 법령을 준수합니다. 본 개인정보 처리방침은 회사가 제공하는 모자이크 처리 서비스(이하 "서비스") 이용과 관련하여, 개인정보의 처리 및 보호에 관한 사항을 규정합니다.
      </Typography>
        
      <Box sx={{ my: 2 }}>
        <Typography variant="h6" gutterBottom>
          제1조 (개인정보의 수집 및 이용 목적)
        </Typography>
        <Typography variant="body1" paragraph>
          회사는 다음의 목적을 위해 개인정보를 수집하고 이용합니다:
          <ul>
            <li>서비스 제공</li>
            <li>이용자 본인 확인 및 서비스 이용 계약 체결</li>
            <li>서비스 제공을 위한 고객 관리 및 지원</li>
            <li>고객 문의 및 응대</li>
            <li>서비스와 관련된 문의사항 처리</li>
            <li>결제 및 구독 관리</li>
            <li>구독 요금 결제 및 정산</li>
          </ul>
        </Typography>
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography variant="h6" gutterBottom>
          제2조 (수집하는 개인정보의 항목)
        </Typography>
        <Typography variant="body1" paragraph>
          회사는 서비스 이용을 위해 최소한의 개인정보를 수집합니다:
          <ul>
            <li>필수 정보: 기업명, 담당자 이름, 이메일</li>
            <li>서비스 이용 중 수집되는 정보: 업로드된 영상 (모자이크 처리 후 즉시 삭제됨)</li>
          </ul>
        </Typography>
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography variant="h6" gutterBottom>
          제3조 (개인정보의 보유 및 이용 기간)
        </Typography>
        <Typography variant="body1" paragraph>
          회사는 개인정보의 수집 목적이 달성되면 지체 없이 해당 정보를 파기합니다. 업로드된 영상은 업로드 후 1일(24시간) 뒤에 삭제됩니다.
        </Typography>
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography variant="h6" gutterBottom>
          제4조 (개인정보의 파기 절차 및 방법)
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>파기 절차:</strong> 수집된 개인정보는 목적 달성 후 즉시 파기됩니다.
          <br />
          <strong>파기 방법:</strong> 전자적 파일 형태의 정보는 복구할 수 없는 방법으로 영구 삭제합니다. 종이에 출력된 정보는 분쇄기로 파쇄하거나 소각합니다.
        </Typography>
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography variant="h6" gutterBottom>
          제5조 (개인정보의 제3자 제공)
        </Typography>
        <Typography variant="body1" paragraph>
          회사는 이용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:
          <ul>
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령에 따라 요구되는 경우</li>
          </ul>
        </Typography>
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography variant="h6" gutterBottom>
          제6조 (개인정보 처리의 위탁)
        </Typography>
        <Typography variant="body1" paragraph>
          회사는 서비스 운영을 위해 개인정보 처리를 타 업체에 위탁할 수 있습니다. 위탁 시 관련 사항은 이용자에게 사전 고지하며, 수탁 업체는 개인정보 보호를 위한 법적 의무를 준수합니다.
        </Typography>
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography variant="h6" gutterBottom>
          제7조 (이용자의 권리와 행사 방법)
        </Typography>
        <Typography variant="body1" paragraph>
          이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제, 처리 정지를 요구할 수 있습니다.
          <br />
          개인정보 관련 요청은 회사 이메일(privacy@mozit.co.kr)을 통해 접수할 수 있습니다. 회사는 요청을 받은 즉시 적절한 조치를 취하며, 처리 결과를 통지합니다.
        </Typography>
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography variant="h6" gutterBottom>
          제8조 (개인정보의 보호를 위한 기술적·관리적 대책)
        </Typography>
        <Typography variant="body1" paragraph>
          회사는 개인정보를 안전하게 보호하기 위해 다음과 같은 대책을 강구합니다:
          <ul>
            <li>기술적 조치: 개인정보의 암호화 및 접근 통제</li>
          </ul>
        </Typography>
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography variant="h6" gutterBottom>
          제9조 (개인정보 보호책임자)
        </Typography>
        <Typography variant="body1" paragraph>
          이용자는 개인정보와 관련된 문의, 불만, 피해 구제 요청을 위해 아래의 개인정보 보호책임자에게 연락할 수 있습니다:
          <ul>
            <li>책임자: KT 에이블스쿨 6기 13조</li>
            <li>이메일: privacy@mozit.co.kr</li>
            <li>전화번호: (070) - **** - ****</li>
          </ul>
        </Typography>
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography variant="h6" gutterBottom>
          제10조 (개인정보 처리방침의 변경)
        </Typography>
        <Typography variant="body1" paragraph>
          회사는 개인정보 처리방침을 개정할 수 있으며, 변경 사항은 회사 웹사이트 또는 이메일을 통해 공지합니다.
        </Typography>
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography variant="body1" paragraph>
          <strong>부칙</strong>
          <br />
          본 방침은 2025년 1월 22일부터 시행됩니다.
        </Typography>
      </Box>
    </Container>
    <Divider />
    <Footer/>
    </AppTheme>
  );
}