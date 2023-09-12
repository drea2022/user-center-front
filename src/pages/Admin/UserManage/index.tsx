import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Image} from 'antd';
import { useRef } from 'react';
import {searchUsers} from "@/services/ant-design-pro/api";




const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
  },
  {
    title: '用户账号',
    dataIndex: 'account',
    copyable: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarurl',
    render: (_,record)=>(
      <div>
        <Image src={record.avatarurl} width={100}/>
      </div>
    ),
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueEnum: {
      0: {text:'男'},
      1: {
        text: '女',
      },
    },
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: '星球编号',
    dataIndex: 'planetCode',
    copyable: true,
  },
  {
    title: '邮件',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: '用户状态',
    dataIndex: 'status',
    valueEnum: {
      0: {text:'禁用',status:'Error'},
      1: {
        text: '正常使用',
        status: 'Success',
      },
    },
  },
  {
    title: '角色',
    dataIndex: 'role',
    valueType: 'select',
    valueEnum: {
      0: {text:'普通用户',status:'Default'},
      1: {
        text: '管理员',
        status: 'Error',
      },
    },
  },
  {
    title: '用户创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
  },


  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={''} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        const  userList=await searchUsers();
        return {
          data:userList
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
    />
  );
};
