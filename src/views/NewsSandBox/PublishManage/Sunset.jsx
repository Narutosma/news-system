import { Button } from 'antd';
import React from 'react';
import PublishComp from '../../../components/Publish/PublishComp';
import usePublish from '../../../components/Publish/usePublish';

export default function Sunse() {
  const { dataSource, sunsetHandle } = usePublish(3);
  return (
    <PublishComp dataSource={dataSource} 
                 button={(id) => <Button onClick={() => {
                  sunsetHandle(id);
                 }}>删除</Button>}/>
  )
}
