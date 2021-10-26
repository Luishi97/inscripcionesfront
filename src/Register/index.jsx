import { Col, Row, Steps } from 'antd'
import useRegisterStudent from './useRegisterStudent'
import FormRegisterPersonalData from './Form/RegisterPersonalData'
import './register.sass'
import { useState } from 'react'
import FormRegisterPaymentData from './Form/RegisterPaymantData'
import { CSSTransition } from 'react-transition-group'
import FormRegisterFileData from './Form/RegisterFileData'
import fcpnLogo from '../shared/assets/logo.png'
import useHandlerFormData from '../shared/hooks/useHandlerFormData'

const { Step } = Steps

export default function Register() {
  const [current, setCurrent] = useState(0)
  const { formData, handlerFormData, cleanFormData } = useHandlerFormData()
  const handlerRegisterForm = useRegisterStudent(cleanFormData, setCurrent)

  const handlerFinish = () => {
    setCurrent(current + 1)
  }

  return (
    <div className="register__container">
      <Row gutter={24} className="register">
        <Col xs={{ span: 24 }} md={{ span: 12 }} className="register__forms">
          <CSSTransition in={current === 0} unmountOnExit timeout={200} classNames="alert">
            <FormRegisterPersonalData
              initialValue={formData}
              onFinish={handlerFinish}
              handlerFormData={handlerFormData}
            />
          </CSSTransition>

          <CSSTransition in={current === 1} unmountOnExit timeout={200} classNames="alert">
            <FormRegisterPaymentData
              initialValue={formData}
              onFinish={handlerFinish}
              handlerFormData={handlerFormData}
            />
          </CSSTransition>

          <CSSTransition in={current === 2} unmountOnExit timeout={200} classNames="alert">
            <FormRegisterFileData
              formData={formData}
              initialValue={formData}
              onFinish={handlerRegisterForm}
              handlerFormData={handlerFormData}
            />
          </CSSTransition>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }} className="steps__container">
          <div className="steps">
            <Steps type="navigation" current={current} onChange={setCurrent} direction="vertical">
              <Step status={current > 0 ? 'finish' : 'process'} title="Datos personales" />
              <Step
                status={current > 1 ? 'finish' : current === 1 ? 'process' : 'wait'}
                title="Datos de la factura"
              />
              <Step
                status={current > 2 ? 'finish' : current === 2 ? 'process' : 'wait'}
                title="Boleta de pago"
              />
            </Steps>
            <img src={fcpnLogo} alt="logo" className="logo" />
          </div>
        </Col>
      </Row>
    </div>
  )
}
