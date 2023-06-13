import axios from "../axios";
import useUserStore from "../store";

const useRefreshToken = () => {
  const accessToken = useUserStore((state) => state.accessToken);
  const setCredential = useUserStore((state) => state.setAccessToken);

  const refresh = async () => {
    console.log("accessToken in refresh func :", accessToken);
    const response = await axios.get("/api/auth/refresh", {
      withCredentials: true,
      headers: `Authorization Bearer ${accessToken ? accessToken : ""}`,
    });

    setCredential(response.data.accessToken);
    console.log(
      "old token: ",
      accessToken,
      "newToken: ",
      response.data.accessToken
    );

    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
