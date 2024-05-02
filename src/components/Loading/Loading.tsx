import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

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
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return;
};

export default Loading;
