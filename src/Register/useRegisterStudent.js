import {Modal} from 'antd';
import { useCallback } from 'react'
import { create } from '../config/api'

const { confirm } = Modal

export default function useRegisterStudent(cleanFormData, setCurrent) {
  const handlerRegisterForm = useCallback((formData, setIsLoading) => {
    confirm({
      title: 'Verifique que sus datos para la factura son correctos',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#F4D03F" width={32} height={32}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>,
      content: <div>
        <strong>Nombre:</strong> {formData.invoiceName} 
        <br />
        <strong>NIT: </strong>{formData.invoiceNit}
      </div>,
      onOk() {
        formData.invoice = {}
        formData.invoice.name = formData.invoiceName
        formData.invoice.nit = formData.invoiceNit

        formData.payment = {}
        formData.payment.urlFile = formData.file.file.response.data.url
        formData.payment.dateOfPay = formData.paymentDateOfPay.toDate()

        delete formData.invoceName
        delete formData.invoceNit
        delete formData.paymentDateOfPay
        delete formData.file

        create('students', formData, setIsLoading, () => {cleanFormData(); setCurrent(0)})
      },
    })
  }, [])

  return handlerRegisterForm
}
