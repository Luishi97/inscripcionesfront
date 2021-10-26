import { Button, Input, Space } from 'antd'
import { useRef, useState } from 'react'

export const useGetColumns = (setItemData, setIsVisible) => {
  const [sortedInfo, setSortedInfo] = useState({})
  const [filteredInfo, setFilteredInfo] = useState({})
  const setSearchInputRef = useRef(null)
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = dataIndex => ({
    // eslint-disable-next-line
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={setSearchInputRef}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                height={12}
                width={12}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Limpiar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filtrar
          </Button>
        </Space>
      </div>
    ),
    // eslint-disable-next-line
    filterIcon: filtered => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill={filtered ? '#1890ff' : '#c0c0c0'}
        height={18}
        width={18}
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible && setSearchInputRef) {
        window.setTimeout(() => setSearchInputRef.focus, 100)
      }
    }
    //   this.state.searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //     //   searchWords={[this.state.searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  })

  const handleChange = (_, filters, sorter) => {
    setFilteredInfo(filters)
    setSortedInfo(sorter)
  }

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Primer apellido',
      dataIndex: 'firstLastName',
      key: 'firstLastName',
      onFilter: (value, record) => record.firstLastName.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'firstLastName' && sortedInfo.order,
      responsive: ['md'],
      ...getColumnSearchProps('firstLastName')
    },
    {
      title: 'Segundo apellido',
      dataIndex: 'secondLastName',
      key: 'secondLastName',
      onFilter: (value, record) => record.secondLastName.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'secondLastName' && sortedInfo.order,
      responsive: ['md'],
      ...getColumnSearchProps('secondLastName')
    },
    {
      title: 'C.I.',
      dataIndex: 'ci',
      key: 'ci',
      onFilter: (value, record) => record.ci.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      responsive: ['md'],
      ...getColumnSearchProps('ci')
    },
    {
      title: 'Opciones',
      dataIndex: 'options',
      key: 'options',
      // eslint-disable-next-line
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setIsVisible(true)
              setItemData(record)
            }}
          >
            Ver Detalles
          </Button>
        </Space>
      )
    }
  ]
  return { columns, handleChange }
}
