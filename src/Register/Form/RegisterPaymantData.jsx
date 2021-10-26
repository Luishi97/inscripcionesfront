import { Form, Input, Button, DatePicker } from 'antd'
import { LAYOUT, LAYOUT_BUTTOM } from '../../constants/ui/forms'
import PropTypes from 'prop-types'

export default function FormRegisterPaymentData({ initialValue, handlerFormData, onFinish }) {

  return (
    <Form
      name="inscriptions"
      {...LAYOUT}
      initialValues={initialValue}
      onFinish={onFinish}
      autoComplete="off"
      onChange={({target})=> {
        handlerFormData({name: target.id.split('_')[1], value: target.value})
      }}
    >
      <h1>Datos de la factura</h1>
      <Form.Item
        label="Nombre de la factura"
        name="invoiceName"
        rules={[
          {
            required: true,
            message: 'Debe ingresar el nombre de la factura'
          }
        ]}
      >
        <Input placeholder="Ingrese el nombre de la factura" />
      </Form.Item>
      <Form.Item
        label="NIT"
        name="invoiceNit"
        rules={[
          {
            required: true,
            message: 'Debe ingresar el nit'
          }
        ]}
      >
        <Input placeholder="Ingrese el NIT" />
      </Form.Item>
      <Form.Item
        label="Fecha de pago"
        name="paymentDateOfPay"
        rules={[
          {
            required: true,
            message: 'Debe ingresar la fecha de pago'
          }
        ]}
      >
        <DatePicker 
          onChange={(value) => handlerFormData({name: 'paymentDateOfPay', value})} 
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item {...LAYOUT_BUTTOM}>
        <Button type="primary" htmlType="submit" block>
          Siguiente
        </Button>
      </Form.Item>
    </Form>
  )
}

FormRegisterPaymentData.propTypes = {
  initialValue: PropTypes.object,
  handlerFormData: PropTypes.func,
  onFinish: PropTypes.func
}
