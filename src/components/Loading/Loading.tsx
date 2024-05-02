import React, { useEffect } from "react";

type LoadingProps = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
};

const Loading = ({ loading, setLoading, isAuthenticated }: LoadingProps) => {
  useEffect(
    () => {
      setLoading(false);
    },// eslint-disable-next-line
    [isAuthenticated]
  );

  if (loading) {
    return null;
  }

  return;
};

export default Loading;
