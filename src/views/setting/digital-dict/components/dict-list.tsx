import { Card, Form, Input, InputNumber, Popconfirm, Space, Table, message } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { EditOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'
import { Context } from '../store/reducerContent'
import { addUpdateDictListApi, deleteDictApi, getDictListApi } from '@/api/modules/settting/digital-dict'
import { connect } from 'react-redux'
import moment from 'moment'
import { FORMATTER_TIME } from '@/const/constants'

const ADD_EDIT_ENUM = {
	ADD: 'ADD',
	EDIT: 'EDIT'
}

const DictList: React.FC = (props: any) => {
	const { userInfo } = props

	const {
		state: { selectType }
	} = useContext(Context)

	const [form] = Form.useForm()
	const [editingKey, setEditingKey] = useState('')
	const [dataSource, setDataSource] = useState<any>([])
	const [addOrEdit, setAddOrEdit] = useState('')

	useEffect(() => {
		if (selectType && selectType?.length) {
			getDictList()
		}
	}, [selectType])

	const getDictList = () => {
		getDictListApi({
			type: selectType[0] || '',
			page: 1,
			pageSize: 1000
		}).then((res: any) => {
			setDataSource(res?.items || [])
		})
	}

	const columns: any = [
		{
			dataIndex: 'name',
			title: '字典名称',
			editable: true,
			placeholder: '请输入字典名称'
		},
		{
			dataIndex: 'code',
			title: '字典编码',
			editable: () => addOrEdit === ADD_EDIT_ENUM.ADD,
			placeholder: '请输入字典编码'
		},
		{
			dataIndex: 'sort',
			title: '字典排序',
			editable: true,
			placeholder: '请输入排序'
		},
		{
			dataIndex: 'comment',
			title: '字典描述',
			editable: true,
			placeholder: '请输入字典描述'
		},
		{
			dataIndex: 'modifier',
			title: '更新用户'
		},
		{
			dataIndex: 'updatedTime',
			title: '更新时间'
		},
		{
			width: 100,
			fixed: 'right',
			render: (text: any, record: any) => {
				const { id } = record
				if (editingKey === id) {
					return (
						<Space className="handle-box">
							<a onClick={() => saveDict(record)}>保存</a>
							<Popconfirm title="确认要取消?" onConfirm={() => cancelDict(id)}>
								<span className="cancel">取消</span>
							</Popconfirm>
						</Space>
					)
				}
				if (editingKey) {
					return (
						<Space className="disabled-handle-box">
							<EditOutlined />
							<PlusCircleOutlined />
							<MinusCircleOutlined />
						</Space>
					)
				}
				return (
					<Space className="handle-box">
						<EditOutlined onClick={() => editDict(record)} />
						<Popconfirm title="确认要删除?" onConfirm={() => deleteDict(id)}>
							<MinusCircleOutlined style={{ color: 'red' }} />
						</Popconfirm>
					</Space>
				)
			}
		}
	]

	// 新增枚举字典
	const addDict = () => {
		const record = {
			name: '',
			code: '',
			sort: '',
			id: nanoid(),
			comment: '',
			creator: '--',
			createdTime: '--'
		}
		setDataSource([...dataSource, record])
		editDict(record)
		// 设置 状态为新增
		setAddOrEdit(ADD_EDIT_ENUM.ADD)
	}

	// 编辑
	const editDict = (record: any) => {
		form.setFieldsValue({ ...record })
		setEditingKey(record?.id)
		setAddOrEdit(ADD_EDIT_ENUM.EDIT)
	}

	// 删除
	const deleteDict = (id: any) => {
		deleteDictApi({ id }).then(() => {
			const filterArr = dataSource.filter((item: any) => item.id !== id)
			setDataSource(filterArr)
			message.success('删除成功！')
		})
	}

	// 新增未编辑的情况，取消后直接删除
	const cancelDict = (id: any) => {
		if (addOrEdit === ADD_EDIT_ENUM.ADD) {
			const filterArr = dataSource.filter((item: any) => item.id !== id)
			setDataSource(filterArr)
		}
		setEditingKey('')
	}
	// 保存
	const saveDict = async (record: any) => {
		const values = await form.validateFields().then(values => {
			return values
		})
		const { id } = record
		const type = selectType[0] // 分类type
		const data = addOrEdit === ADD_EDIT_ENUM.ADD ? { ...values, type } : { ...record, ...values, type }
		addUpdateDictListApi(data).then((dictId: any) => {
			setDataSource(
				[...dataSource].map((item: any) => {
					if (item?.id === id) {
						return { ...item, ...values, modifier: userInfo?.nickname, updatedTime: moment().format(FORMATTER_TIME), id: dictId }
					}
					return item
				})
			)
			setEditingKey('')
			message.success('操作成功！')
		})
	}

	// 是否处于编辑状态
	const isEditing = (record: any) => {
		return record?.id === editingKey
	}

	// 处理可编辑
	const mergedColumns = columns.map((col: any) => {
		const { editable } = col
		// 新增的时候，编码可编辑状态
		if ((typeof editable === 'function' && !editable()) || !editable) {
			return col
		}
		return {
			...col,
			onCell: (record: any) => ({
				record,
				inputType: col.dataIndex === 'sort' ? 'number' : 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				placeholder: col?.placeholder,
				editing: isEditing(record)
			})
		}
	})

	// 自定义可编辑渲染table
	const EditableCell: any = ({ editing, dataIndex, inputType, children, placeholder, ...restProps }: any) => {
		const inputNode =
			inputType === 'number' ? <InputNumber min={0} step={1} placeholder={placeholder} /> : <Input placeholder={placeholder} />

		return (
			<td {...restProps}>
				{editing ? (
					<Form.Item
						name={dataIndex}
						style={{ margin: 0 }}
						rules={[
							{
								required: true,
								message: placeholder
							}
						]}
					>
						{inputNode}
					</Form.Item>
				) : (
					children
				)}
			</td>
		)
	}

	// 动态展示新增
	const renderPlusIcon = () => {
		if (editingKey) {
			return <PlusCircleOutlined className="add-disabled-iocn" />
		}
		return <PlusCircleOutlined onClick={addDict} className="add-active-iocn" />
	}

	return (
		<Card title="图片分类" extra={renderPlusIcon()}>
			<Form form={form} component={false}>
				<Table
					components={{
						body: {
							cell: EditableCell
						}
					}}
					rowKey="id"
					columns={mergedColumns}
					dataSource={dataSource}
					scroll={{ x: 'max-content' }}
					pagination={false}
				/>
			</Form>
		</Card>
	)
}

const mapStateToProps = (state: any) => state.global

export default connect(mapStateToProps)(DictList)
