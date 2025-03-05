import { BASE_URL } from "./config";

const getAttachment = async () => {
  try {
    const result = await fetch(`${BASE_URL}/stay/attachmentlist`);
    const data = await result.json();
    return data;
  } catch (e) {
    console.log("Stay Attachment Error", e);
  }
};

const getStayListAll = async (paramData) => {
  try {
    const result = await fetch(`${BASE_URL}/stay/list?${paramData}`);
    const data = await result.json();
    return data;
  } catch (e) {
    console.log("Stay List Error", e);
  }
};

const getStayDetail = async (x) => {
  try {
    const result = await fetch(`${BASE_URL}/stay/detail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(x),
    });

    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }
    const data = await result.json();
    console.log("data :: ", data);
    return data;
  } catch (e) {
    console.log("Stay Detail Error", e);
  }
};

const getBookmark = async (dataObj) => {
  console.log("zzzzzzzzzzzzzzzzz :::::::::::: ", dataObj);

  try {
    const result = await fetch(`${BASE_URL}/stay/bookmarkInfo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataObj),
    });
    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }
    const data = await result.text();
    console.log("data :::::::::: ", data);

    return data;
  } catch (e) {
    console.log("getBookmark ERROR", e);
  }
};

const setBookmarkInsert = async (dataObj) => {
  try {
    const result = await fetch(`${BASE_URL}/stay/bookmark`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataObj),
    });
    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }
    const data = await result.text();
    return data;
  } catch (e) {
    console.log("getBookmark ERROR", e);
  }
};

const delBookmark = async (dataObj) => {
  try {
    const result = await fetch(`${BASE_URL}/stay/bookmarkdel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataObj),
    });
    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }
    const data = await result.text();
    return data;
  } catch (e) {
    console.log("getBookmark ERROR", e);
  }
};

export {
  getAttachment,
  getStayListAll,
  getStayDetail,
  getBookmark,
  delBookmark,
  setBookmarkInsert,
};
