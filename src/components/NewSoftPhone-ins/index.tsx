import React from 'react';

import SoftPhone from './SoftPhone';

import type { SoftPhoneInstance, DoCallOutParams } from './SoftPhone';

const config = {
  instanceId: 'ccc_xp_pre-cn-78v1gnp97002',
  token:
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZGV2ZWxvcGVyLnJoaW5va2Vlbi5jb20iLCJleHAiOjE2MjEwNzAxODEsInVzZXJfbmFtZSI6IjE1MDE5NDc3MDMyIiwianRpIjoiZDdmN2UzMjYtNTA0MC00NmZlLWE4OTgtNjcxMWY3MjJjMjY4IiwiY2xpZW50X2lkIjoiaWRwX3Rlc3RfMTZRNG96Iiwic2NvcGUiOlsiZnV5dW4tZGV2Il19.gKYCwxAtBSwUhL_LqFBECCHCMkHgWky_QBoz3zRpecWyhYAqtPBRcW044_Sq8IMvHmG05Asx8ceybnGwXMQ95MGR1vE_Gedyhuthxqs6a75rkVa79D9HyZ3IlJ_3POaGrtDF2P9HvXr25JWkNX23XuM9lAVwJIWGhv3Kquri7Y-nKe3dMpd84hMULiMJCNxL-VxXTSd-WRnWns2isV0SqV_D5-y-XKElH_CDO-GtnQa4iuTUX4D04fbH9CNdqdiAg8Cx3zKWQH5ewD2DovBsWcjbqu6PRaG60klit7R1locIg89kkrNGr6F-cXXkKcJu2lMa7qdLmjO15OXIKjyz3w',
};

let softPhoneInstance: Promise<SoftPhoneInstance> | null;

const getSoftPhoneInstance = () => {
  if (softPhoneInstance) return softPhoneInstance;

  softPhoneInstance = new Promise((resolve) => {
    const instanceConfig = { config };

    SoftPhone.newSoftPhoneInstance(instanceConfig, resolve);
  });

  return softPhoneInstance;
};

const doCallOut = async (params: DoCallOutParams) => {
  const instance = await getSoftPhoneInstance();
  return instance.doCallOut(params);
};

const softPhoneApi = {
  doCallOut,
};

export default softPhoneApi;
