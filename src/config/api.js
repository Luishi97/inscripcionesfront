import { Modal, notification } from 'antd'
import axios from 'axios'
import './notifications.sass'

const HOST_API = process.env.REACT_APP_HOST_API

const api = axios.create({
  baseURL: `http://${HOST_API}/api/`,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  mode: 'cors'
})

export const getData = (path, setData, setIsLoading) => {
  setIsLoading(true)
  api
    .get(`/${path}`)
    .then(res => {
      console.log('res.data', res.data)
      setData(res.data.data)
    })
    .catch(err => {
      console.log('err', err)
      setData(null)
      notification['error']({
        message: 'No se pudo obtener la lista de alumnos',
        description: 'Hubo un error al obtener la lista de alumnos ' + err,
        className: 'notifications'
      })
    })
    .finally(() => setIsLoading(false))
}

export const create = (path, data, setIsLoading, onCorrect) => {
  setIsLoading(true)
  api
    .post(`/${path}`, data)
    .then(() => {
      Modal.success({
        title: 'Registrado con exito',
        content: 'Se registro su usuario satisfactoriamente'
      })
      // notification['success']({
      //   message: 'Registrado con exito',
      //   description: 'Se registro su usuario satisfactoriamente',
      //   className: 'notifications'
      // })
      if (onCorrect) onCorrect()
    })
    .catch(err => {
      Modal.error({
        title: 'Error al registrar',
        content: 'No se pudo registrar: ' + JSON.parse(err.request.response).message
      })
      // notification['error']({
      //   message: 'No se pudo registrar',
      //   description: 'Hubo un error al registrar ' + err,
      // })
    })
    .finally(() => setIsLoading(false))
}

export const deleteFile = id => {
  api
    .delete(`/upload/${id}`)
    .then(res => {
      console.log('res.data', res.data)
    })
    .catch(err => console.log('err', err))
}
