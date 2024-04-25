import React from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

const loading = () => {
  return (
    <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
      <LinearProgress color="inherit" className="bg-[#9875ff]" />
    </Stack>
  );
};

export default loading;
