import { Button } from 'antd';
import React from 'react';
import PublishComp from '../../../components/Publish/PublishComp';
import usePublish from '../../../components/Publish/usePublish';

export default function Unpublished() {
  const { dataSource, unpublishedHandle } = usePublish(1);
  return (
    <PublishComp dataSource={dataSource}
      button={(id) => <Button onClick={() => {
        unpublishedHandle(id);
      }}>发布</Button>} />
  )
}
