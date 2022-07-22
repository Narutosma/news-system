import { Button } from 'antd';
import React from 'react';
import PublishComp from '../../../components/Publish/PublishComp';
import usePublish from '../../../components/Publish/usePublish';

export default function Published() {
  const { dataSource, publishedHandle } = usePublish(2);
  return (
    <PublishComp dataSource={dataSource}
      button={(id) => <Button onClick={() => {
        publishedHandle(id);
      }}>下线</Button>} />
  )
}
