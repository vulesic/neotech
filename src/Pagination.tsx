import React, { useEffect, useState } from "react";
import { PaginationIC } from './lib/interfaces';
import { Box, Button, Stack } from "@mui/material";

const Pagination = ({ count, limit, handleClick }: PaginationIC) => {
  const [paginationArray, setPaginationArray] = useState<number[]>([]);

  useEffect(() => {
    if (count > limit) {
      let pageNum = Math.ceil(count / limit);
      const pagArray = Array.from({ length: pageNum }, (_, index) => index + 1);
      setPaginationArray(pagArray);
    } else {
      setPaginationArray([]);
    }
  }, [count, limit]);

  return (
    <Box className="Pagination">
      {paginationArray.length > 0 && (
        <Stack direction="row" spacing={1}>
          {paginationArray.map((item) => (
            <Button key={item} size="small" variant="outlined" onClick={() => handleClick(item)}>
              {`${item}`}
            </Button>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Pagination;
