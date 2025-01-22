import Cookies from 'js-cookie';

export function isUserLoggedIn() {
  const token = Cookies.get('jwt'); // JWT를 쿠키에서 가져오기
  if (!token) return false;

  // JWT를 디코드하거나 서버에서 검증하는 로직 추가 가능
  return true; // 로그인 상태 확인
}
// import Cookies from 'js-cookie';

// export function isUserLoggedIn(accessToken) {
//   // 쿠키에서 토큰을 가져오고, useAuth의 토큰 값도 확인
//   if (!accessToken && !Cookies.get('jwt')) {
//     return false;
//   }
//   return true;
// }
