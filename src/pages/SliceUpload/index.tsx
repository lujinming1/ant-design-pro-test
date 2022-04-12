import React from 'react';

import { Button, Upload } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { UploadOutlined } from '@ant-design/icons';

const SliceUpload: React.FC = () => {
  return (
    <PageContainer>
      <Upload action="/api/upload/once" data={{ name: '测试' }}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </PageContainer>
  );
};

export default SliceUpload;
