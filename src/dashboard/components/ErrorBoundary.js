import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 에러가 발생하면 상태를 업데이트하여 대체 UI를 렌더링하도록 함
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로깅 등 추가 작업 수행 가능
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 대체 UI 렌더링
      return (
        <div style={{ padding: '16px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <ErrorIcon color="error" /> {/* 에러 아이콘 */}
          <h3>데이터 로딩 실패</h3> {/* 메시지 */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
