import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import axios from 'axios';
import AuthService from '../services/auth.service';
import authHeader from '../services/auth-header';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <input type={inputType} name={dataIndex} defaultValue={record[dataIndex]} />
      ) : (
        children
      )}
    </td>
  );
};

const Item = ({ playerId }) => {
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    // Загрузка данных
    const fetchData = async () => {
      const result = await axios(`/api/players/${AuthService.getCurrentUser().id}/items`);
      setData(result.data);
    };
    fetchData().then(() => console.log('data loaded')).catch((err) => console.log(err));
  }, [playerId]);

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

const save = async (key) => {
  console.log("record: " + key.toString());
  const row = data.find((item) => key === item.id); // Changed from item.id to item.key
  if (!row) {
    message.error('Item not found');
    return;
  }

  const formData = new FormData(document.forms.formEdit);
  const updatedData = {};
  formData.forEach((value, field) => {
    console.log(field + ": " + value);
    updatedData[field] = value;
  });

  try {
    // provide jwt token to backend
    const header = authHeader();
    const config = {
      headers: {
        authorization: header['x-access-token']
      }
    };
    const res = await axios.put(`/api/items/${key}`, updatedData, config);
    if (res.status === 200) {
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData[index] = { ...item, ...updatedData }; // Use direct assignment instead of splice
        setData(newData);
        setEditingKey('');
        message.success('Item updated successfully');
      }
    }
  } catch (err) {
    message.error('Error updating item');
  }
};

  const useItem = (key) => {
    // Логика использования предмета
    message.success(`Item ${key} used`);
  };

  const deleteItem = async (key) => {
    try {
      const res = await axios.delete(`/api/items/${key}`);
      if (res.status === 200) {
        setData(data.filter((item) => item.id !== key));
        message.success('Item deleted successfully');
        // refresh page
        window.location.reload();
      }
    } catch (err) {
      message.error('Error deleting item');
    }
  };

  const columns = [
    {
      title: 'Key',
      dataIndex: 'id',
      width: '10%',
      editable: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Quality',
      dataIndex: 'quality',
      width: '15%',
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a href="#" onClick={() => save(record.id)} style={{ marginRight: 8 }}>
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Button>
            <Button disabled={true} onClick={/*() => useItem(record.key)*/ () => { }}>
              Use
            </Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteItem(record.id)}>
              <Button disabled={editingKey !== ''}>Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'quality' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <form name="formEdit">
      <h2>Ваши предметы</h2>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        rowKey={(record) => record.id}

      />
    </form>
  );
};

export default Item;
