import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Modal } from '@components/Common/Modal/Modal';
import { Box, Button, Typography } from '@mui/material';

const RequestHistory = () => {
  const dataArray = [
    {
      name: '강서진',
      date: '2024-11-25',
      region: '서울특별시 성동구',
      serviceType: 'VISIT',
      status: 'SEND',
    },
    {
      name: '강서진',
      date: '2024-12-25',
      region: '서울특별시 성동구',
      serviceType: 'ANY',
      status: 'REJECTED',
    },
    {
      name: '강서진',
      date: '2024-12-25',
      region: '서울특별시 성동구',
      serviceType: 'ANY',
      status: 'ACCEPTED',
    },
  ];

  return (
    <Box>
      <DetailHeader label="견적요청내역" />
      <Box p={4} color="text.main">
        {dataArray.map((data, index) => {
          return (
            <Box key={index}>
              <Box
                mb={4}
                p={4}
                borderRadius="10px"
                boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 7px 1px"
                sx={
                  data.status == 'REJECTED'
                    ? { backgroundColor: 'n4.main', filter: 'blur(2px)' }
                    : { '&:hover': { cursor: 'pointer' } }
                }
              >
                <Box display="flex" alignItems="center">
                  <img
                    src="/images/default-groomer-profile.png"
                    width="100px"
                  />
                  <Box ml={2} fontSize={14}>
                    <Typography fontWeight={700}>{data.name}</Typography>
                    <Box display="flex">
                      <Box container spacing={0.5}>
                        <text>희망날짜:</text> <br />
                        <text>지역:</text> <br />
                        <text>서비스 형태:</text>
                      </Box>
                      <Box ml={2}>
                        <text>{data.date}</text> <br />
                        <text>{data.region}</text> <br />
                        <text>
                          {data.serviceType == 'VISIT'
                            ? '방문'
                            : data.serviceType == 'SHOP'
                              ? '매장'
                              : '방문, 매장'}
                        </text>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {data.status == 'SEND' && (
                  <Box
                    sx={{
                      position: 'relative',
                      float: 'right',
                      top: -110,
                      right: -10,
                    }}
                    // onClick={(e) => {
                    //   e.stopPropagation();
                    // }}
                  >
                    <Modal
                      buttonColor="delete"
                      openLabel="요청삭제"
                      leftLabel="취소"
                      rightLabel="삭제"
                      title="요청을 삭제하시겠습니까?"
                    />
                  </Box>
                )}

                {data.status == 'ACCEPTED' && (
                  <Box
                    color="secondary.main"
                    fontSize={14}
                    sx={{
                      position: 'relative',
                      float: 'right',
                      top: -110,
                      right: -10,
                    }}
                  >
                    요청전송완료
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default RequestHistory;
