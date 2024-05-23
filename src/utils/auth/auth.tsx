import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

/**
 * 로그인 axios
 * @description 로그인 성공시 accesstoken을 localstorage에 저장, result값 true 반환 => Login/index.tsx
 * @param {string} loginId 사용자 아이디 && 이메일
 * @param {string} password 사용자 비밀번호
 * @returns {Promise<{ success: boolean,  error?: string }>}
 */

export const loginedIn = async (loginId: string, password: string) => {
  try {
    const response = await api.post("/login", {
      memberId: loginId,
      memberPassword: password,
    });

    if (response.status === 200) {
      console.log(response.data);

      const access_token = response.data.accessToken;
      const refresh_token: any = response.data.memberNo;
      const memberName: any = response.data.memberName;

      localStorage.setItem("memberName", memberName);
      localStorage.setItem("ACCESS_TOKEN", access_token);
      localStorage.setItem("REFRESH_TOKEN", refresh_token);

      return { success: true };
    } else {
      return { success: false, error: "로그인 실패" };
    }
  } catch (error) {
    console.error("error:", error);
    return { success: false, error: "error" };
  }
};

/**
 * 로컬스토리지에 저장된 access_token삭제 및 백에 로그아웃 요청
 * @param access_token
 * @description 추가 구성 필요 -> 리다이렉트 ?
 */

export const logout = async () => {
  const navigate = useNavigate();
  try {
    const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
    const response = await api.post("/logout", {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    if (response.status === 200) {
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("REFRESH_TOKEN");
      localStorage.removeItem("memberName");

      navigate("/users/login");
    } else {
      return { success: false, error: "로그아웃 실패" };
    }
  } catch (error) {
    console.error("error", error);
    return { success: false, error: "error" };
  }
};
