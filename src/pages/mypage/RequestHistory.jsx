import { deleteEstimate } from '@/api/estimate';
import { groomerProfile } from '@/api/groomerProfile';
import { getRequest } from '@/api/request';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Modal } from '@components/Common/Modal/Modal';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RequestHistory = () => {
  const [dataList, setListData] = useState();
  const [groomerId, setGroomerId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getGroomerProfile = async () => {
      const res = await groomerProfile();
      setGroomerId(res.profileId);
      const estimateList = await getRequest(res.profileId);
      setListData(estimateList);
    };
    getGroomerProfile();
  }, []);

  return (
    <Box>
      <DetailHeader label="견적요청내역" />
      <Box p={4} color="span.main">
        {dataList?.map((data, index) => {
          return (
            <Box
              key={index}
              onClick={() =>
                navigate('/mypage/requesthistorydetail', {
                  state: {
                    estimateData: data,
                    estimateStatus: data.estimateStatus,
                  },
                })
              }
            >
              <Box
                mb={4}
                p={4}
                borderRadius="10px"
                boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 7px 1px"
                sx={
                  data.estimateStatus == 'REJECTED'
                    ? { backgroundColor: 'n4.main', filter: 'blur(2px)' }
                    : { '&:hover': { cursor: 'pointer' } }
                }
                onClick={(e) => {
                  data.estimateStatus == 'REJECTED' && e.stopPropagation();
                }}
              >
                <Box display="flex" alignItems="center">
                  <img
                    src={data.imageKey || '/images/default-groomer-profile.png'}
                    width="100px"
                    style={{ borderRadius: '50%' }}
                  />
                  <Box ml={2} fontSize={14}>
                    <Typography fontWeight={700}>{data.name}</Typography>
                    <Box display="flex">
                      <Box spacing={0.5}>
                        <span>희망날짜:</span> <br />
                        <span>지역:</span> <br />
                        <span>서비스 형태:</span>
                      </Box>
                      <Box ml={2}>
                        <span>{data.date}</span> <br />
                        <span>{data.region}</span> <br />
                        <span>
                          {data.serviceType == 'VISIT'
                            ? '방문'
                            : data.serviceType == 'SHOP'
                              ? '매장'
                              : '방문, 매장'}
                        </span>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {data.estimateStatus == null && (
                  <Box
                    sx={{
                      position: 'relative',
                      float: 'right',
                      top: -110,
                      right: -10,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Modal
                      buttonColor="delete"
                      openModalButton="요청삭제"
                      secondaryButton="취소"
                      primaryButton="삭제"
                      title="요청을 삭제하시겠습니까?"
                      action={async () => {
                        await deleteEstimate(data.requestId, groomerId);
                        const estimateList = await getRequest(groomerId);
                        setListData(estimateList);
                      }}
                    />
                  </Box>
                )}
                {data.estimateStatus == 'SEND' && (
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
