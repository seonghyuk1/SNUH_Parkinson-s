import client from "./client";

export const getTestsByTypeAndUserId = (testType, userId) =>
  client.get(`/tests/${testType}`, {
    params: {
      userId: userId,
      size: 1000,
    },
  });

export const downloadAllTestFilesByUserId = async (userId) => {
  try {
    const downloadToken = await getDownloadToken();

    const response = await client.get(
      `/tests/download/${userId}?downloadToken=${downloadToken}`,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const filename = getFilenameFromHeaders(response);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.append(link);
    link.click();
  } catch (e) {
    alert("파일 다운로드에 실패했습니다.");
    console.log(e);
  }
};

export const downloadTestFileByUserIdAndFilename = async (userId, filename) => {
  try {
    const existingLink = document.querySelector(`a[filename="${filename}"]`);
    if (existingLink) {
      existingLink.click();
      return;
    }

    const downloadToken = await getDownloadToken();

    const response = await client.get(
      `/tests/download/${userId}/${filename}?downloadToken=${downloadToken}`,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.append(link);
    link.click();
  } catch (e) {
    alert("파일 다운로드에 실패했습니다.");
    console.log(e);
  }
};

const getDownloadToken = async () => {
  const response = await client.get(`/tests/download/token`);
  const downloadToken = response?.data?.downloadToken;

  console.log(response);
  console.log(downloadToken);

  return downloadToken;
};

const getFilenameFromHeaders = (response) => {
  const contentDisposition = response.headers["content-disposition"];
  const filenamePart = "filename*=UTF-8''";
  const filenameIndex =
    contentDisposition.indexOf(filenamePart) + filenamePart.length;
  const filename = contentDisposition.slice(filenameIndex);
  return filename;
};
