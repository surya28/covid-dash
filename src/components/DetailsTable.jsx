import React, { useEffect, useState } from 'react';
import { Table, Button, Input } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Search } = Input

const DetailsTable = ({ data }) => {
    const [showTable, setShowTable] = useState(false);
    const columns = [
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country'
        },
        {
            title: 'Population',
            dataIndex: 'population',
            key: 'population',
            render: (data) => {
                return (
                    <p>{data || 0}</p>
                )
            }
        },
        {
            title: 'Deaths',
            dataIndex: 'deaths',
            key: 'deaths',
            render: (data) => {
                return (
                    <p>{data?.total || 0}</p>
                )
            }
        }
    ]
    const [tableData, setData] = useState([]);

    useEffect(() => {
        if (data) {
            setData(data)
        }
    }, [])

    const onSearch = (value) => {
        if (value.length > 0) {
            const filteredata = data?.filter(country => country?.country?.toLowerCase().includes(value.toLowerCase()));
            setData(filteredata)
        } else {
            setData(data)
        }
    }

    return (
        <div style={{
            marginTop: '2rem'
        }}>
            {
                !showTable ? (
                    <Button style={{ marginBottom: '1rem', background: 'transparent' }} type="default" icon={<PlusCircleOutlined />} onClick={() => setShowTable((prev) => !prev)} >
                        More
                    </Button>
                ) : (
                    <Button style={{ marginBottom: '1rem', background: 'transparent' }} type="default" icon={<MinusCircleOutlined />} onClick={() => setShowTable((prev) => !prev)} >
                        Less
                    </Button>
                )
            }
            {
                showTable &&
                <>
                    <Search
                        placeholder="search countries"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                        style={{
                            marginBottom: '1rem'
                        }}
                    />
                    <Table columns={columns} dataSource={tableData} />
                </>
            }
        </div>
    )
}

export default DetailsTable;