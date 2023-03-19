## 최종 작업
- 페이지 세부 접근권한 설정 완료
- 테스트 이름 피그마 참조 한국어 반영
- 각 테이블 데이터 미적재 공지 설정
- 서버주소, 페이지 비밀번호 환경변수로 설정하여 보안 유지


#### 현재 진행완료 작업 
- 테이블 기능 분할 (검사자 ID 클릭 -> 해당 검사자 운동기록) 및 UI 개선
- 이제 비해당열을 클릭하더라도 다운로드가 되지 않고 다운로드 컬럼만이 다운로드 실행 (+ 검사자 ID 클릭시 운동목록 이동 기능도 유지)

- 여백, 행높이 등 CSS
- 사용자 위치 네비게이션
- 사용자 기록, 메인 페이지 분할, 운동 데이터 모두 받아오기 
- 개별 기록 필터 완료, 운동 데이터 필터 및 페이지네이션 완료
- 모든 운동기록 불러오기 완료
- mp4 파일 다운로드 (fileNameList - 3가지로 된 것) 시 코덱오류인지 영상 재생 (해결 O)
- 로고 줄이기, 테이블 표기 부분 수정
- TD 줄바꿈 트라이
- 다 최신순 (내림차순) (초기화 눌렀을 때도)
- ★ run build 에러 - 확인 결과 index.html에서 css와 js 경로 문제가 아닌 cors 문제로 의심됨 (서버통신 안 되는 거 보니 + 구글링) 
-- 이제 랜더링은 잘 되는데.. API 통신은 배포 했을 때 이루어진다는듯....?


### build도 함께 커밋완료




# UI
## 전체 사용자 명단
![image](https://user-images.githubusercontent.com/38232501/226096540-24c3e999-2c0b-49e6-bf9f-cabdbb87cce3.png)
![image](https://user-images.githubusercontent.com/38232501/226096564-28f9cb14-aeb8-4413-93b5-070cf485eb29.png)
![image](https://user-images.githubusercontent.com/38232501/226096570-6de96a59-d88f-41a0-ad69-c72e1972d323.png)
![image](https://user-images.githubusercontent.com/38232501/226096573-27be3ee3-f6a3-4dc3-9f12-627843552f79.png)
![image](https://user-images.githubusercontent.com/38232501/226096582-beb0c2ac-0ea2-46c3-9ca2-c58ee922c093.png)


## 운동기록
![image](https://user-images.githubusercontent.com/38232501/226096600-86e1884f-86cd-4968-b41c-7279b8a7cd43.png)
![image](https://user-images.githubusercontent.com/38232501/226096606-bee86e39-a51c-489e-8ab3-9b4278c20588.png)
