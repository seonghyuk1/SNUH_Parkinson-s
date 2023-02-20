#### 현재 진행완료 작업 
- 사용자 기록, 메인 페이지 분할, 운동 데이터 모두 받아오기 
- 개별 기록 필터 완료, 운동 데이터 필터 및 페이지네이션 완료
- 모든 운동기록 불러오기 완료

#### 해야할 작업 및 이슈
- 네이버 플레이스식 검색하면 필터에 적용 고정
- 운동기록에서 다운로드 onClick

- mp4 파일 다운로드 (fileNameList - 3가지로 된 것) 시 코덱오류인지 영상 재생 X (하지만 파일명 일치 모두 확인, 직접 주소창 GET 요청으로도 확인 완료.. why?!?!?)
-- fileName (1가지 csv)는 정상적 이 또한 직접 GET 요청으로 비교 완료



### 비고
- 사용자 전체명단은 각 header별 검색 기능 + 오름차순 내림차순 기능 설정
- 3가지 다운로드가 존재하는 FileNameList 경우 배열 내역을 그대로 나오느라 띄어쓰기 불가 



# UI

![image](https://user-images.githubusercontent.com/38232501/219429385-796aa29e-5812-458d-82dc-6de6f7bc4502.png)

![image](https://user-images.githubusercontent.com/38232501/219429448-70a6c9bf-4966-47f3-9c7d-8104db9f4bc0.png)


# 환자별 기록

![image](https://user-images.githubusercontent.com/38232501/219430124-f9a454a8-ddcb-4c56-b6ca-80e3f5017d7a.png)


# 운동 전체 기록

## 중간 운동 select 페이지

![image](https://user-images.githubusercontent.com/38232501/219856446-3ca2eb25-0e08-432b-a29b-de5acc708660.png)


# 운동 테스트별 기록 

###  전

![image](https://user-images.githubusercontent.com/38232501/219429492-568b7940-af45-4af5-b1ac-3f1edd45cce7.png)


### 후 

![image](https://user-images.githubusercontent.com/38232501/219856462-c79fb175-41ab-439c-b7b3-19478b0b7439.png)
