import React, { useEffect, useRef } from 'react';

import { HotlineClientUI } from 'HotlineClient';
import { Button } from 'antd';

const HotlineClientUi = window.HotlineClientUi;

const hotlineClientInitConfig = {
  instanceId: 'ccc_xp_pre-cn-78v1gnp97002', // 实例 id
  token:
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZGV2ZWxvcGVyLnJoaW5va2Vlbi5jb20iLCJleHAiOjE2MjA5ODc2NDEsInVzZXJfbmFtZSI6IjE1MDE5NDc3MDMyIiwianRpIjoiYzMyMDI0ZjktOGFkNC00NGNlLWJlM2YtMTNjYTZkZjYyN2YxIiwiY2xpZW50X2lkIjoiaWRwX3Rlc3RfMTZRNG96Iiwic2NvcGUiOlsiZnV5dW4tZGV2Il19.euPIorin9xWYN6SMA809ZmOJsHfa8aPuiuAOex8CHY-RSzs5eyUwPwyUR1QgtuUJkSZXMELm4Ge3kr6oZJAJSbVaD3kMtcISdzyTHydoz1kj51bBtMdILRdcq9Isq9A27M43-Tg9sgYRzmFheufHK3rJveB3g963eFhSxLfpJCHcrzUVfnI01GCtilXFLvdo8ZSJsJrr_kwLrdPdU_z6gsFKZrWfuEB3b2sEaYMfV7imugL5F2a-Tt4G1PFmgBZggqXfnArSguGMeC_L9W2d-t-LVEVGQwML1_epSgbAQb586-NYHXfbtNXsumDmfbkyKxMPW_PvlhnCUvX6X0B09Q', // token
};

const hotlineClientUIProps = {
  /**
   * 初始化 Client 需要的参数。
   */
  config: hotlineClientInitConfig,

  /**
   * 是否支持拖拽。默认为 false。
   */
  draggable: true,

  /**
   * 是否打开检测工具。默认是关闭的。
   */
  openCheckTool: false,
};

const NewSoftPhone = () => {
  const standWrap = useRef();

  useEffect(() => {
    HotlineClientUi.renderClient(standWrap.current, hotlineClientUIProps, (client) => {
      console.log(client);
    });
  }, [hotlineClientUIProps]);
  const handleClick = () => {

  };

  return (
    <>
      <div ref={standWrap} />
      <Button onClick={handleClick}>拨打电话</Button>
    </>
  );
};

export default NewSoftPhone;
