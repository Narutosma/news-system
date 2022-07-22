import React, { useState, useEffect, useRef, useContext } from 'react';
import { Table, Button, Modal, message, Form, Input } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { getCategories, deleteCategory, editCategory } from '../../../api';
const EditableContext = React.createContext(null);
const { confirm } = Modal;
export default function Category() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    getCategories().then(res => setDataSource(res));
  }, []);
  // 删分类操作
  const deleteCategoryHandle = id => {
    confirm({
      title: '是否要删除该项?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteCategory(id).then(() => message.success('删除成功'));
        setDataSource([...dataSource.filter(item => item.id !== id)]);
      },
    });
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '栏目名称',
      dataIndex: 'title',
      editable: true,
      onCell(record) {
        return {
          record,
          editable: true,
          dataIndex: 'title',
          title: 'title',
          handleSave,
        }
      },
    },
    {
      title: '操作',
      render(data) {
        return <Button shape="circle"
          danger
          icon={<DeleteOutlined />}
          onClick={() => deleteCategoryHandle(data.id)} />
      }
    }]
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  // 判断两个title内容是否相等
  const isContentEqual = (row) => {
    let result = false;
    dataSource.forEach(item => {
      if(item.id === row.id){
        if(item.title === row.title){
          result = true;
        }
      }
    })
    return result;
  }

  const handleSave = (row) => {
    // 如果内容没有改变那就不进行任何操作
    if(isContentEqual(row)){
      return;
    }
    editCategory(row).then(() => message.success('修改成功'))
    setDataSource([...dataSource.map(item => {
      if (item.id === row.id) {
        return {
          ...row
        }
      }
      return item;
    })])
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };
  return (
    <Table dataSource={dataSource}
      columns={columns}
      rowKey={item => item.id}
      pagination={{
        position: ['none', 'bottomRight'],
        pageSize: 5
      }}
      components={{
        body: {
          row: EditableRow,
          cell: EditableCell,
        },
      }} />
  )
}
