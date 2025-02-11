import Cookies from 'js-cookie';

export function isUserLoggedIn() {
  const token = Cookies.get('jwt'); // JWT를 쿠키에서 가져오기
  if (!token) return false;

  // JWT를 디코드하거나 서버에서 검증하는 로직 추가 가능
  return true; // 로그인 상태 확인
}
