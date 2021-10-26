import { Form, Input, Button, Select } from 'antd'
import { LAYOUT, LAYOUT_BUTTOM } from '../../constants/ui/forms'
import PropTypes from 'prop-types'

const { Option } = Select

export default function FormRegisterPersonalData({ initialValue, handlerFormData, onFinish }) {
  return (
    <Form
      name="inscriptions"
      {...LAYOUT}
      onFinish={onFinish}
      initialValues={initialValue}
      autoComplete="off"
      onChange={({ target }) => {
        handlerFormData({ name: target.id.split('_')[1], value: target.value })
      }}
    >
      <h1>Datos personales</h1>
      <Form.Item
        label="Nombres"
        name="name"
        rules={[
          {
            required: true,
            message: 'Debe ingresar sus nombres'
          }
        ]}
      >
        <Input placeholder="Ingrese sus nombres" />
      </Form.Item>
      <Form.Item
        label="Primer apellido"
        name="firstLastName"
        rules={[
          {
            required: true,
            message: 'Debe ingresar sus nombres'
          }
        ]}
      >
        <Input placeholder="Ingrese su primer apellido" />
      </Form.Item>
      <Form.Item label="Segundo apellido" name="secondLastName">
        <Input placeholder="Ingrese su segundo apellido" />
      </Form.Item>
      <Form.Item
        label="Carnet de identidad"
        name="ci"
        rules={[
          {
            required: true,
            message: 'Debe ingresar su número de carnet'
          }
        ]}
      >
        <Input placeholder="Ingrese su número de carnet" />
      </Form.Item>
      <Form.Item
        label="Teléfono"
        name="tellphone"
        rules={[{ max: 8, message: 'Ingrese un número válido' }]}
      >
        <Input type="number" placeholder="Ingrese su número de teléfono" />
      </Form.Item>
      <Form.Item
        label="Celular"
        name="cellphone"
        rules={[
          { required: true, message: 'Debe ingresae su número de celular' },
          { max: 8, message: 'Ingrese un número válido' }
        ]}
      >
        <Input type="number" placeholder="Ingrese su número de celular" />
      </Form.Item>
      <Form.Item
        label="Correo electónico"
        name="email"
        rules={[
          {
            required: true,
            message: 'Debe ingresar su número de carnet'
          }
        ]}
      >
        <Input type="email" placeholder="Ingrese su correo electrónico" />
      </Form.Item>
      <Form.Item
        label="Departamento"
        name="city"
        rules={[
          {
            required: true,
            message: 'Debe seleccionar su departamento'
          }
        ]}
      >
        <Select
          showSearch
          placeholder="Departamento de residencia"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={value => handlerFormData({ name: 'city', value })}
        >
          <Option value="La Paz">La Paz</Option>
          <Option value="Cochabamba">Cochabamba</Option>
          <Option value="Santa Cruz">Santa Cruz</Option>
          <Option value="Sucre">Sucre</Option>
          <Option value="Oruro">Oruro</Option>
          <Option value="Potosí">Potosí</Option>
          <Option value="Tarija">Tarija</Option>
          <Option value="Beni">Beni</Option>
          <Option value="Pando">Pando</Option>
        </Select>
      </Form.Item>
      <Form.Item {...LAYOUT_BUTTOM}>
        <Button type="primary" htmlType="submit" block>
          Siguiente
        </Button>
      </Form.Item>
    </Form>
  )
}

FormRegisterPersonalData.propTypes = {
  initialValue: PropTypes.object,
  handlerFormData: PropTypes.func,
  onFinish: PropTypes.func
}
