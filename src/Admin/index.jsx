import { useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import { Button } from 'antd'
import { getData } from '../config/api'
import ListOfStudents from './Table/ListOfStudents'
import useExportToExcel from './useExportToExcel'
import './admin.sass'

export default function Admin() {
  const [students, setStudents] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const exportToExcel = useExportToExcel()

  useEffect(() => {
    getData('students', setStudents, setIsLoading)
  }, [])

  return (
    <div className="container">
      <div className="header">
        <h1>Lista de insctitos</h1>
      </div>
      <div className="action__buttons">
        <Button type="primary" className="button__excel" onClick={() => exportToExcel(students)}>
          Exportar excel
        </Button>
      </div>
      <ListOfStudents data={students} isLoading={isLoading} />
    </div>
  )
}
