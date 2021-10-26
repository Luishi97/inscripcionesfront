import { Button, Divider, Drawer, Modal } from 'antd'
import PropTypes from 'prop-types'
import { useState } from 'react'

export default function StudentDetail({ studentData, isVisible, setIsVisible }) {
  const [showModal, setShowModal] = useState(false)
  const width = window.window.screen.width
  return (
    <Drawer
      title="Datos del formulario de registro del estudiante"
      placement="right"
      width={width >= 640 ? '30%' : '70%'}
      destroyOnClose
      onClose={() => setIsVisible(false)}
      visible={isVisible}
    >
      <h2>Datos personales</h2>
      <h3>Nombre: </h3>
      <p>{studentData.name}</p>
      <h3>Primer apellido: </h3>
      <p>{studentData.fistLastName}</p>
      <h3>Segundo apellido: </h3>
      <p>{studentData.secondLastName}</p>
      <h3>Ciudad: </h3>
      <p>{studentData.city}</p>
      <h3>Carnet de identidad: </h3>
      <p>{studentData.ci}</p>
      <h3>Email: </h3>
      <p>{studentData.email}</p>
      <h3>Telefono: </h3>
      <p>{studentData.tellphone}</p>
      <h3>Celular: </h3>
      <p>{studentData.cellphone}</p>
      <Divider />
      <h2>Datos para la factura</h2>
      <h3>Nombre de la factura: </h3>
      <p>{studentData.invoice && studentData.invoice.name}</p>
      <h3>NIT: </h3>
      <p>{studentData.invoice && studentData.invoice.nit}</p>
      <Divider />
      <h2>Datos para la factura</h2>
      <h3>Fecha de pago: </h3>
      <p>{studentData.payment && studentData.payment.dateOfPay}</p>
      <h3>Boleta de pago: </h3>
      <Button type="primary" onClick={() => setShowModal(true)}>
        Ver boleta de pago
      </Button>
      <Modal
        width={750}
        title="Boleta de pago"
        visible={showModal}
        destroyOnClose
        onCancel={() => setShowModal(false)}
      >
        <embed
          src={
            studentData.payment &&
            'http://' +
              process.env.REACT_APP_HOST_API +
              ':' +
              process.env.REACT_APP_HOST_PORT +
              studentData.payment.urlFile
          }
          width="100%"
          height="400px"
        />
      </Modal>
      <Divider />
    </Drawer>
  )
}

StudentDetail.propTypes = {
  studentData: PropTypes.shape({
    name: PropTypes.string,
    fistLastName: PropTypes.string,
    secondLastName: PropTypes.string,
    ci: PropTypes.number,
    city: PropTypes.string,
    email: PropTypes.string,
    tellphone: PropTypes.number,
    cellphone: PropTypes.number,
    invoice: PropTypes.shape({
      name: PropTypes.string,
      nit: PropTypes.string
    }),
    payment: PropTypes.shape({
      dateOfPay: PropTypes.object,
      urlFile: PropTypes.string
    })
  }),
  isVisible: PropTypes.bool,
  setIsVisible: PropTypes.func
}
