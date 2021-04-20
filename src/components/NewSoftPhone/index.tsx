import React, { useState, useEffect, useRef } from 'react';

import { Button } from 'antd';

import styles from './index.less';

const { HotlineClientUi } = window as any;

const config = {
  instanceId: 'ccc_xp_pre-cn-78v1gnp97002',
  token:
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZGV2ZWxvcGVyLnJoaW5va2Vlbi5jb20iLCJleHAiOjE2MjEwNzAxODEsInVzZXJfbmFtZSI6IjE1MDE5NDc3MDMyIiwianRpIjoiZDdmN2UzMjYtNTA0MC00NmZlLWE4OTgtNjcxMWY3MjJjMjY4IiwiY2xpZW50X2lkIjoiaWRwX3Rlc3RfMTZRNG96Iiwic2NvcGUiOlsiZnV5dW4tZGV2Il19.gKYCwxAtBSwUhL_LqFBECCHCMkHgWky_QBoz3zRpecWyhYAqtPBRcW044_Sq8IMvHmG05Asx8ceybnGwXMQ95MGR1vE_Gedyhuthxqs6a75rkVa79D9HyZ3IlJ_3POaGrtDF2P9HvXr25JWkNX23XuM9lAVwJIWGhv3Kquri7Y-nKe3dMpd84hMULiMJCNxL-VxXTSd-WRnWns2isV0SqV_D5-y-XKElH_CDO-GtnQa4iuTUX4D04fbH9CNdqdiAg8Cx3zKWQH5ewD2DovBsWcjbqu6PRaG60klit7R1locIg89kkrNGr6F-cXXkKcJu2lMa7qdLmjO15OXIKjyz3w',
};

const NewSoftPhone = () => {
  const standWrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const clientRef = useRef(null);
  const agentRef = useRef(null);

  const onClientOnline = (client: HotlineClient) => {
    console.log('client', client);
    clientRef.current = client;

    console.log('2222', clientRef.current);
  };

  const onAgentOnline = (agent) => {
    console.log('agent', agent);
    agentRef.current = agent;
    agent.checkIn();
  };

  const onCallContextChange = (callContext) => {
    console.log('callContext', callContext);
    /*
    const a = {
      callDirection: 1,
      callee: { phoneNumber: '10086' },
      caller: { phoneNumber: '2000000001271771', aid: '63001' },
      deflect: (e) => {},
      dispose: () => {},
      duration: 0,
      hangUp: async () => {},
      hold: async () => {},
      participants: [],
      retrieve: async () => {},
      startTime: 'Thu Apr 15 2021 15:53:54 GMT+0800 (中国标准时间) ',
      identity: {
        jobId: '10050130412',
        connId: '10050130413',
        holdConnId: '',
        acId: '10050130412',
      },
    };
    */
  };

  useEffect(() => {
    const hotlineClientUIProps = {
      /**
       * 初始化 Client 需要的参数。
       */
      config,

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
    // HotlineClientUi.renderClient(standWrap.current, hotlineClientUIProps);
  }, []);

  useEffect(() => {
    console.log('1111', clientRef.current);
    const unAfterCallHangup = clientRef.current?.on('AfterCallHangup', () => {
      setVisible(false);
    });

    const unTokenExpired = clientRef.current?.on('TokenExpired', () => {
      console.log('TokenExpired');
    });

    const unAgentStatusChange = clientRef.current?.on('AgentStatusChange', (e) => {
      console.log('AgentStatusChange', e);
    });

    const unEnableStateChange = clientRef.current?.on('EnableStateChange', (e) => {
      console.log('EnableStateChange', e);
      /*
      const a = {
        agentStatusChangeEnable: true,
        breakEnable: true,
        callAnswerEnable: false,
        callDeflectEnable: false,
        callDialEnable: true,
        callHangupEnable: false,
        callHoldEnable: false,
        callRetrieveEnable: false,
        checkinEnable: false,
        checkoutEnable: true,
        readyEnable: true,
        status: 'AgentAcw',
        trainEnable: false,
      };
      */
    });

    const unCallVoiceText = clientRef.current?.on('CallVoiceText', (e) => {
      console.log('CallVoiceText', e);
    });

    const unAgentReconnect = clientRef.current?.on('AgentReconnect', (e) => {
      console.log('AgentReconnect', e);
    });

    const unAgentCallReconnect = clientRef.current?.on('AgentCallReconnect', (e) => {
      console.log('AgentCallReconnect', e);
    });

    const unUnHandleEvent = clientRef.current?.on('UnHandleEvent', (e) => {
      console.log('UnHandleEvent', e);
    });

    const unSystemCallDialOut = clientRef.current?.on('SystemCallDialOut', (e) => {
      console.log('SystemCallDialOut', e);
    });

    const unAgentStatusChange = clientContext.on('AgentStatusChange', (data) => {
      console.log('坐席状态', data);
      /*
      const a = {
        buId: 905,
        content: '{}',
        contentType: 'JSON',
        departmentId: 10,
        enumIconType: 'NORMAL',
        enumSceneType: 'HOTLINECS',
        gmtCreate: 1618885103971,
        head: {
          agentBasicCode: 'AgentReady',
          agentBasicDesc: '坐席空闲状态',
          aid: '63001',
          appName: 'hotlinecs',
          cmd: 'agentStatus',
          departmentId: '10',
          mid: '1618885166972',
          name: 'xx',
          supportNewFunction: '0',
          time: '2021-04-20 10:18:23',
          tk: '0088411250b3e665000000000000f5f1',
          xspaceHotline: '1',
        },
        isPersistent: false,
        sceneType: 'hotline-message',
        senderId: 0,
        senderType: '2',
        userId: 63001,
        uuid: '5cd30ae4-0ffb-4288-b56e-18136f91334c',
      };
      */
    });

    return () => {
      unSystemCallDialOut?.dispose();
      unAfterCallHangup?.dispose();
      unTokenExpired?.dispose();
      unAgentStatusChange?.dispose();
      unEnableStateChange?.dispose();
      unCallVoiceText?.dispose();
      unAgentReconnect?.dispose();
      unAgentCallReconnect?.dispose();
      unUnHandleEvent?.dispose();
      unAgentStatusChange?.dispose();
    };
  }, [clientRef.current]);

  const handleClick = () => {
    console.log(11);
    setVisible(true);
    agentRef.current?.dial('10086').then((value) => {
      console.log('dial', value);
    });
  };

  return (
    <>
      <div
        className={styles.softPhoneWrap}
        style={{ display: visible ? 'block' : 'none' }}
        ref={standWrap}
      />
      <Button onClick={handleClick}>拨打电话</Button>
    </>
  );
};

export default NewSoftPhone;
