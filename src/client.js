import axios from "axios";

const client = axios.create();
const token = sessionStorage.getItem("token");

// 글로벌 설정 예시:

// API 주소를 다른 곳으로 사용함
client.defaults.baseURL = process.env.REACT_APP_DB_HOST;
// 헤더 설정
client.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : null;

// 인터셉터 설정
client.interceptors.response.use(
  (response) => {
    // 요청 성공 시 특정 작업 수행
    return response;
  },
  (error) => {
    // 요청 실패 시 특정 작업 수행
    return Promise.reject(error);
  }
);

export default client;
