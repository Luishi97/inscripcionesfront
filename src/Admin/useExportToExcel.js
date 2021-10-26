const ExportJsonExcel = require('js-export-excel')

export default function useExportToExcel() {
  const exportToExcel = data => {
    const options = {}
    options.fileName = 'Lista De Alumno ' + new Date().toLocaleDateString('es-ES')

    options.datas = [
      {
        sheetData: data.map(dt => ({
          ...dt,
          invoiceName: dt.invoice.name,
          invoiceNit: dt.invoice.nit,
          paymentDateOfPay: dt.payment.dateOfPay,
          paymentUrlFile:
            'http://' +
            process.env.REACT_APP_HOST_API +
            ':' +
            process.env.REACT_APP_HOST_PORT +
            dt.payment.urlFile
        })),
        sheetFilter: [
          'name',
          'firstLastName',
          'secondLastNameLastName',
          'ci',
          'tellphone',
          'cellphone',
          'email',
          'city',
          'invoiceName',
          'invoiceNit',
          'paymentDateOfPay',
          'paymentUrlFile'
        ],
        sheetHeader: [
          'Nombres',
          'Primer apellido',
          'Segundo apellido',
          'C.I.',
          'Telefono',
          'Celular',
          'Email',
          'Ciudad',
          'Nombre de la factura',
          'Nit de la factura',
          'Fecha de pago',
          'Url de la boleta de pago'
        ]
      }
    ]

    const toExcel = new ExportJsonExcel(options)
    toExcel.saveExcel()
  }

  return exportToExcel
}
