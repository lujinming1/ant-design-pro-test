import React, { useState, useEffect, useRef } from 'react';

import { Button } from 'antd';

const { HotlineClientUi } = window;

const hotlineClientInitConfig = {
  instanceId: 'ccc_xp_pre-cn-78v1gnp97002', // 实例 id
  token:
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZGV2ZWxvcGVyLnJoaW5va2Vlbi5jb20iLCJleHAiOjE2MjA5ODc2NDEsInVzZXJfbmFtZSI6IjE1MDE5NDc3MDMyIiwianRpIjoiYzMyMDI0ZjktOGFkNC00NGNlLWJlM2YtMTNjYTZkZjYyN2YxIiwiY2xpZW50X2lkIjoiaWRwX3Rlc3RfMTZRNG96Iiwic2NvcGUiOlsiZnV5dW4tZGV2Il19.euPIorin9xWYN6SMA809ZmOJsHfa8aPuiuAOex8CHY-RSzs5eyUwPwyUR1QgtuUJkSZXMELm4Ge3kr6oZJAJSbVaD3kMtcISdzyTHydoz1kj51bBtMdILRdcq9Isq9A27M43-Tg9sgYRzmFheufHK3rJveB3g963eFhSxLfpJCHcrzUVfnI01GCtilXFLvdo8ZSJsJrr_kwLrdPdU_z6gsFKZrWfuEB3b2sEaYMfV7imugL5F2a-Tt4G1PFmgBZggqXfnArSguGMeC_L9W2d-t-LVEVGQwML1_epSgbAQb586-NYHXfbtNXsumDmfbkyKxMPW_PvlhnCUvX6X0B09Q', // token
};

const NewSoftPhone = () => {
  const standWrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const clientRef = useRef(null);
  const agentRef = useRef(null);
  const callContextRef = useRef(null);

  const onClientOnline = (client: HotlineClient) => {
    console.log('client', client);
    clientRef.current = client;
  };

  const onAgentOnline = (agent) => {
    console.log('agent', agent);
    agentRef.current = agent;
    agent.checkIn();
  };

  const onCallContextChange = (callContext) => {
    console.log('callContext', callContext);
    callContextRef.current = callContext;
  };

  useEffect(() => {
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
      onClientOnline,

      onAgentOnline,

      onCallContextChange,
    };
    HotlineClientUi.renderClient(standWrap.current, hotlineClientUIProps, (client) => {
      console.log(client);
    });
  }, []);

  useEffect(() => {
    const unBeforeCallDial = clientRef.current?.on('BeforeCallDial', (e)=>{
      console.log('hujiao', e)
    })

    const unAfterCallHangup = clientRef.current?.on('AfterCallHangup', (e)=>{
      console.log('挂断', e)
      setVisible(false)
    })

    return () =>{
      unBeforeCallDial?.();
      unAfterCallHangup?.();
    }
  },[clientRef.current])

  const handleClick = () => {
    setVisible(true);
    agentRef.current?.dial('10086')
  };

  return (
    <>
      <div style={{ display: visible ? 'block' : 'none' }} ref={standWrap} />
      <Button onClick={handleClick}>拨打电话</Button>
    </>
  );
};

export default NewSoftPhone;
