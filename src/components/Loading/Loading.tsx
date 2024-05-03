
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        "justify-content": "center",
        "align-items": "center",
      }}
    >
      <CircularProgress size="80px" thickness={5} />
    </Box>
  );
};

export default Loading;
