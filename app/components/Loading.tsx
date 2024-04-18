import React from 'react'
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

const Loading = () => {
    return (
        <div>
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress className='bg-[#7A4EFF]' color='inherit' />
            </Stack>
        </div>
    )
}

export default Loading