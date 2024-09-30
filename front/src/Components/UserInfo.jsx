import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

const fetchUserData = async ({ queryKey }) => {
  const [, token] = queryKey;
  const response = await axios.get("http://nature-gangwon.shop:8000/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const UserInfo = ({ onSuccess }) => {
  const [cookies] = useCookies(["token"]);
  const { data, error, isLoading } = useQuery({
    queryKey: ["user", cookies.token],
    queryFn: fetchUserData,
    enabled: !!cookies.token, // 토큰이 있을 때만 쿼리를 활성화
    onSuccess,
  });

  if (isLoading) return null;
  if (error) return <div>Error fetching user data</div>;

  return null;
};

export default UserInfo;
