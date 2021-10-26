import { useState } from 'react'
import { Form, Button, Upload } from 'antd'
import { LAYOUT, LAYOUT_BUTTOM } from '../../constants/ui/forms'
import { deleteFile } from '../../config/api'
import PropTypes from 'prop-types'

export default function FormRegisterFileData({ initialValue, formData, onFinish }) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Form
      name="inscriptions"
      {...LAYOUT}
      initialValues={initialValue}
      onFinish={val => onFinish({ ...val, ...formData }, setIsLoading)}
      autoComplete="off"
    >
      <h1>Registro de pago</h1>
      <Form.Item label="Boleta de pago">
        <Form.Item
          name="file"
          noStyle
          rules={[
            {
              required: true,
              message: 'Debe subir su boleta de pago'
            }
          ]}
        >
          <Upload.Dragger
            name="file"
            supportServerRender={false}
            action={'http://' + process.env.REACT_APP_HOST_API + '/api/upload'}
            maxCount={1}
            onRemove={v => {
              deleteFile(v.response.data.fileName)
            }}
          >
            <p className="ant-upload-drag-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width={24}
                height={24}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                />
              </svg>
            </p>
            <p className="ant-upload-text">Click o arrastre el archivo a esta área para subirlo</p>
            <p className="ant-upload-hint">Solo puede subir una imagen o un pdf</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
      <Form.Item {...LAYOUT_BUTTOM}>
        <Button type="primary" htmlType="submit" block loading={isLoading}>
          Registrar
        </Button>
      </Form.Item>
    </Form>
  )
}

FormRegisterFileData.propTypes = {
  initialValue: PropTypes.object,
  formData: PropTypes.object,
  onFinish: PropTypes.func
}
