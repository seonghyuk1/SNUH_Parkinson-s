import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SeletTestButton = ({ onClick, children }) => (
  <Button
    onClick={onClick}
    variant="contained"
    size="large"
    style={{
      width: "300px",
      marginBottom: "20px",
      fontWeight: "bold",
    }}
  >
    {children}
  </Button>
);

const TestButtonList = ({ id, name }) => {
  const navigate = useNavigate();
  const getNavigeteFunction =
    ({ path, state }) =>
    () =>
      navigate(path, { state });

  return (
    <div
      className="d-grid"
      style={{ display: "grid", alignItems: "center", justifyItems: "center" }}
    >
      <SeletTestButton
        onClick={getNavigeteFunction({
          path: "/fingerTest",
          state: {
            id,
            name,
            test: "finger",
            title: "손가락 검사",
            colHead: Finger,
          },
        })}
      >
        손가락 검사
      </SeletTestButton>
      <SeletTestButton
        onClick={getNavigeteFunction({
          path: "/aSoundTest",
          state: {
            id,
            name,
            test: "a-sound",
            title: "'아' 지속발성 검사",
            colHead: Sound_Dadada_Pataka,
          },
        })}
      >
        '아' 지속발성
      </SeletTestButton>
      <SeletTestButton
        onClick={getNavigeteFunction({
          path: "/eSoundTest",
          state: {
            id,
            name,
            test: "e-sound",
            title: "'이' 지속발성 검사",
            colHead: Sound_Dadada_Pataka,
          },
        })}
      >
        '이' 지속발성
      </SeletTestButton>
      <SeletTestButton
        onClick={getNavigeteFunction({
          path: "/dadadaTest",
          state: {
            id,
            name,
            test: "dadada",
            title: "'다' 반복발성 검사",
            colHead: Sound_Dadada_Pataka,
          },
        })}
      >
        '다' 반복발성
      </SeletTestButton>
      <SeletTestButton
        onClick={getNavigeteFunction({
          path: "/patakaTest",
          state: {
            id,
            name,
            test: "pataka",
            title: "'파타카' 반복발성 검사",
            colHead: Sound_Dadada_Pataka,
          },
        })}
      >
        '파타카' 반복발성
      </SeletTestButton>
      <SeletTestButton
        onClick={getNavigeteFunction({
          path: "/screenGazeTest",
          state: {
            id,
            name,
            test: "screen-gaze",
            title: "화면주시 검사",
            colHead: Screengze_Quickblink,
          },
        })}
      >
        화면주시 검사
      </SeletTestButton>
      <SeletTestButton
        onClick={getNavigeteFunction({
          path: "/quickBlinkTest",
          state: {
            id,
            name,
            test: "quick-blink",
            title: "빠른 깜빡임 검사",
            colHead: Screengze_Quickblink,
          },
        })}
      >
        빠른 깜빡임 검사
      </SeletTestButton>
      <SeletTestButton
        onClick={getNavigeteFunction({
          path: "/gaitTest",
          state: {
            id,
            name,
            test: "gait",
            title: "걸음 검사",
            colHead: Gait,
          },
        })}
      >
        걸음 검사
      </SeletTestButton>
    </div>
  );
};

export default TestButtonList;

const Screengze_Quickblink = [
  {
    accessor: "id",
    Header: "검사 번호",
  },
  {
    accessor: "createdAt",
    Header: "생성시간",
  },
  {
    accessor: "userId",
    Header: "검사자 ID",
  },

  {
    accessor: "count",
    Header: "눈 깜빡임 횟수",
  },

  {
    accessor: "timeAfterTakingMedicine",
    Header: "약복용후 지난시간",
  },
  {
    accessor: "fileName",
    Header: "파일 다운로드",
  },
];
const Sound_Dadada_Pataka = [
  {
    accessor: "id",
    Header: "검사 번호",
  },
  {
    accessor: "createdAt",
    Header: "생성시간",
  },
  {
    accessor: "userId",
    Header: "검사자 ID",
  },
  {
    accessor: "timeAfterTakingMedicine",
    Header: "약복용후 지난시간",
  },
  {
    accessor: "fileNameList",
    Header: "파일 다운로드",
  },
];

const Gait = [
  {
    accessor: "id",
    Header: "검사 번호",
  },
  {
    accessor: "createdAt",
    Header: "생성시간",
  },
  {
    accessor: "userId",
    Header: "검사자 ID",
  },
  {
    accessor: "timeAfterTakingMedicine",
    Header: "약복용후 지난시간",
  },

  {
    accessor: "stride",
    Header: "보폭",
  },
  {
    accessor: "step",
    Header: "발걸음 수",
  },
  {
    accessor: "distance",
    Header: "걸은거리",
  },
  {
    accessor: "time",
    Header: "걸은시간",
  },

  {
    accessor: "fileName",
    Header: "파일 다운로드",
  },
];
const Finger = [
  {
    accessor: "id",
    Header: "검사 번호",
  },
  {
    accessor: "createdAt",
    Header: "생성시간",
  },
  {
    accessor: "userId",
    Header: "검사자 ID",
  },
  {
    accessor: "hand",
    Header: "검사한 손",
  },
  {
    accessor: "count",
    Header: "터치 횟수",
  },
  {
    accessor: "timeAfterTakingMedicine",
    Header: "약복용후 지난시간",
  },
  {
    accessor: "fileName",
    Header: "파일 다운로드",
  },
];
