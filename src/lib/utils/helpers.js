// 데이터가 없을 때
export function isEmpty(obj = {}) {
  return Object.keys(obj).length === 0;
}

// undefined 혹은 null 일 때
export function isNull(value) {
  return typeof value === "undefined" || value === null;
}

// 데이터 타입 : 스트링
export function isString(value) {
  return typeof value === "string" || value instanceof String;
}

// 데이터 타입 : 넘버
export function isNumber(value) {
  return typeof value == "number" && !isNaN(value);
}

export function toLower(value) {
  if (isString(value)) {
    return value.toLowerCase();
  }
  return value;
}

export function convertType(value) {
  if (isNumber(value)) {
    return value.toString();
  }

  return value;
}

// 필터기능
export function filterRows(rows, filters) {
  // 들어온 filters의 값이 공백이면 rows 반환 (필터 없을 땐 전체 내보내기)
  // * 첫 상태  : 공백
  if (isEmpty(filters)) return rows;

  // 들어온 행에서 filter 메소드를 통한 작업 수행
  return rows.filter((row) => {
    return Object.keys(filters).every((accessor) => {
      // 우리가 갖고 있는 데이터 값
      const value = row[accessor];

      // 필터에 넣어준 값
      const searchValue = filters[accessor];

      if (searchValue.length === 0) return rows;

      // 소문자로 포함 여부 계산
      if (isString(value)) {
        return toLower(value).includes(toLower(searchValue));
      }

      // 숫자값 일치 비교
      if (isNumber(value)) {
        return value === searchValue;
      }
    });
  });
}

// 필터결과 sorting
export function sortRows(rows, sort) {
  const rows2 = [...rows];
  return rows2.sort((a, b) => {
    const { order, orderBy } = sort;

    // a 내림차순, b 오름차순

    // ID 정렬
    // 반환 값 양수이면 b보다 a를 우선 정렬
    // * a[id]가 먼저 존재한다면 양수 값을 주어 순서를 앞으로 바꿈
    if (isNull(a[orderBy])) return 1;
    // 반환 값 음수일 경우 그대로 유지 (기존대로)
    if (isNull(b[orderBy])) return -1;

    // 문자열 비교
    // 형변환 넘버 -> 스트링 | id를 스트링으로
    const aLocale = convertType(a[orderBy]);
    const bLocale = convertType(b[orderBy]);

    // 오름차순 일 때 aLocale이 bLocale보다 먼저 오면 음수반환 (기존유지)
    if (order === "asc") {
      // 오름차순일 경우 a와 b비교 | false시 양수 주어 앞으로
      return aLocale.localeCompare(bLocale, "en", {
        numeric: isNumber(b[orderBy]),
      });
    } else {
      return bLocale.localeCompare(aLocale, "en", {
        numeric: isNumber(a[orderBy]),
      });
    }
  });
}

// 필터된 행들, 현재페이지, 페이지당 갯수
export function paginateRows(sortedRows, activePage, rowsPerPage) {
  // 설정했던 최대 rowPerPage갯수까지
  return [...sortedRows].slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );
}
