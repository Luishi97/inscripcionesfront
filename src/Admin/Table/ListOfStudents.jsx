import { useState } from 'react'
import { Table } from 'antd'
import { useGetColumns } from './DataTableConfig'
import PropTypes from 'prop-types'
import StudentDetail from '../StudentDetail'

export default function ListOfStudents({ data, isLoading }) {
  const [studentData, setStudentData] = useState({})
  const [isVisible, setIsVisible] = useState(false)
  const { columns, handleChange } = useGetColumns(setStudentData, setIsVisible)
  return (
    <div className="table">
      <Table dataSource={data} columns={columns} loading={isLoading} onChange={handleChange} />
      <StudentDetail studentData={studentData} isVisible={isVisible} setIsVisible={setIsVisible} />
    </div>
  )
}

ListOfStudents.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool
}
