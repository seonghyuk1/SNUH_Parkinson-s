#### 현재 진행완료 작업 
- 테이블 기능 분할 (검사자 ID 클릭 -> 해당 검사자 운동기록) 및 UI 개선
- 이제 비해당열을 클릭하더라도 다운로드가 되지 않고 다운로드 컬럼만이 다운로드 실행 (+ 검사자 ID 클릭시 운동목록 이동 기능도 유지)

- 여백, 행높이 등 CSS
- 사용자 위치 네비게이션
- 사용자 기록, 메인 페이지 분할, 운동 데이터 모두 받아오기 
- 개별 기록 필터 완료, 운동 데이터 필터 및 페이지네이션 완료
- 모든 운동기록 불러오기 완료
- mp4 파일 다운로드 (fileNameList - 3가지로 된 것) 시 코덱오류인지 영상 재생 (해결 O)

#### 해야할 작업 및 이슈
- 로고 줄이기, 테이블 표기 부분 수정
- TD 줄바꿈 트라이
- 다 최신순 (내림차순) (초기화 눌렀을 때도)
- ★ run build 에러 - 확인 결과 index.html에서 css와 js 경로 문제가 아닌 cors 문제로 의심됨 (서버통신 안 되는 거 보니 + 구글링) 
- === 사용으로 고치기



# UI

# 환자별 기록

![image](https://user-images.githubusercontent.com/38232501/222673333-d5e6a5cc-fcbf-4cbd-9c53-1532a389eb0f.png)


# 운동 전체 기록

## 중간 운동 select 페이지

![image](https://user-images.githubusercontent.com/38232501/219856446-3ca2eb25-0e08-432b-a29b-de5acc708660.png)


# 운동 테스트별 기록 

###  운동 기록

![image](https://user-images.githubusercontent.com/38232501/222673146-2d28248f-7e84-4775-afa4-332c7ebea34f.png)

### ID 클릭시 해당 ID의 전체 운동 
![image](https://user-images.githubusercontent.com/38232501/222673281-b87c9255-afa1-4b14-ab4b-4b2b53928f52.png)

