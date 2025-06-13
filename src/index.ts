/* eslint-disable import/no-named-as-default-member */
import express, { Request, Response, Router } from 'express'
import axios from 'axios'
import dotenv from 'dotenv'

import {
  ErrorResponse,
  GeneratePixOutRequest,
  GeneratePixOutResponse,
  GenerateRefundPixInRequest,
  GenerateRefundPixInResponse,
  GenerateStaticPixQRCodeRequest,
  GenerateStaticPixQRCodeResponse,
  GetPixQRCodeByIdentifierRequest,
  GetPixQRCodeByIdentifierResponse,
  PixInWebhook,
  PixOutWebhook,
  WebhookMethod,
} from './types'

dotenv.config()

const envs = {
  PORT: process.env.PORT || 4444,
  STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN || 'abc123',
  STRAPI_URL:
    process.env.STRAPI_URL || 'http://localhost:1337/api/fitbank/webhook',
}

const app = express()
const router = Router()
router.use(express.json())

const http = axios.create({
  baseURL: envs.STRAPI_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${envs.STRAPI_API_TOKEN}`,
  },
})

const database = new Map<number, any>()

app.use('/main/execute', router)

router.post(
  '/GenerateStaticPixQRCode',
  async (
    req: Request<object, object, GenerateStaticPixQRCodeRequest>,
    res: Response<GenerateStaticPixQRCodeResponse | ErrorResponse>
  ) => {
    console.log('GenerateStaticPixQRCode request received')
    try {
      const documentNumber = Date.now()

      database.set(documentNumber, req.body)

      console.log('GenerateStaticPixQRCode response sent')
      return res
        .send({
          Success: 'true',
          Message: 'ISI0001 - Método executado com sucesso',
          DocumentNumber: documentNumber,
        })
        .status(200)
    } catch (error: any) {
      console.log(error.message || error)
      if (!res.headersSent) {
        return res.status(200).send({
          Success: 'false',
          Message: 'Erro ao executar rota',
        })
      }
    }
  }
)

router.post(
  '/GeneratePixOut',
  async (
    req: Request<object, object, GeneratePixOutRequest>,
    res: Response<GeneratePixOutResponse | ErrorResponse>
  ) => {
    console.log('GeneratePixOut request received')
    try {
      const documentNumber = Date.now()

      database.set(documentNumber, req.body)

      console.log('GeneratePixOut response sent')
      res
        .send({
          Success: 'true',
          Message: 'Solicitação para pagamento Pix recebida com sucesso',
          DocumentNumber: documentNumber,
          Url: 'https://www.google.com',
        })
        .status(200)

      const response: PixOutWebhook = {
        Method: WebhookMethod.PixOut,
        FromName: 'John Doe',
        FromTaxNumber: '1234567890',
        FromBankCode: '1234567890',
        FromBankBranch: '1234567890',
        FromBankAccount: '',
        FromBankAccountDigit: '',
        FromISPB: '',
        ToName: '',
        ToTaxNumber: '',
        ToBankCode: '',
        ToBankBranch: '',
        ToBankAccount: '',
        ToBankAccountDigit: '',
        ToISPB: '',
        RefundDate: '',
        ReceiptUrl: '',
        EndToEndId: '',
        Tags: null,
        ErrorDescription: null,
        ErrorCode: null,
        InitiationEndToEndId: null,
        InitiationDocumentNumber: null,
        RefundCode: null,
        PartnerId: 0,
        DocumentNumber: '',
        Identifier: req.body.Identifier,
        EntryId: 0,
        Status: '',
        TotalValue: 0,
        PaymentDate: '',
        BusinessUnitId: 0,
      }

      await http.post('/', response)
    } catch (error: any) {
      console.log(error.message || error)
      if (!res.headersSent) {
        return res.status(200).send({
          Success: 'false',
          Message: 'Erro ao executar rota',
        })
      }
    }
  }
)

router.post(
  '/GetPixQRCodeByIdentifier',
  (
    req: Request<object, object, GetPixQRCodeByIdentifierRequest>,
    res: Response<GetPixQRCodeByIdentifierResponse | ErrorResponse>
  ) => {
    console.log('GetPixQRCodeByIdentifier request received')
    try {
      const data = database.get(req.body.DocumentNumber)

      if (!data) {
        console.log('Documento não encontrado')
        return res.status(200).send({
          Success: 'false',
          Message: 'Documento não encontrado',
        })
      }

      console.log('GetPixQRCodeByIdentifier response sent')
      return res
        .send({
          Success: 'true',
          GetPixQRCodeByIdentifierInfos: [
            {
              Identifier: data.Identifier,
              PixQRCodeType: 'Dynamic',
              PixKey: '000.000.000-00',
              Status: 'Processed',
              City: 'Fortaleza',
              ZipCode: '63700000',
              PayerName: 'Carlos',
              PayerTaxNumber: '000.000.000-00',
              ReceiverName: 'Felipe',
              ReceiverTaxNumber: '000.000.000-00',
              ChangeType: 'None',
              PrincipalVelue: '1.00',
              DueDate: 'string',
              RebateValue: 'string',
              InterestValue: '1.00',
              FineValue: '1.00',
              Reusable: 'false',
              PayerRequest: 'string',
              ExpirationDate: '00/00/0000',
              TransactionChangeType: 'string',
              TransactionValue: 'string',
              TransactionPurpose: 'string',
              AgentModality: 'string',
              CreationDate: '00/00/0000',
              QRCodeBase64:
                'iVBORw0KGgoAAAANSUhEUgAAAjoAAAI6AQAAAAAGM99tAAAFlUlEQVR4nO2dXWrsOBCFT40FebQhC+ilyDvIkkKWlB1YS+kFBKzHBpmah5JkuXNhLhP3jGb66KHTP/KHDJXiqH5kUZwywh/ncACCCCKIIIIIIoggggj6v4AkDweEaZPynbMf8ndRROboIDIBMsdy0fyIFRFE0M+Gsz9+AYD4CvHrBsH45fY5ghEAxuQUEVBEAYAh5V/PXRFBBJ0JisX5BnHQBSgvoyr81UHm+KIilwRgNJs2t/6oFRFE0Kkgvw4KxBeVd72JvF8lO2WMN4FfN/sP0OUfWxFBBP2N4e4+KyIgfp1Ew7QqEAGECdAggyJMa3552IoIIuiMUSx7VGQrfjO94QBsTsM8JCBOgFdA/NUlAZzJkda++7s1gp4aBFXVaqGDmhr5rZdykVdVXfq7NYKeGmQ+u3W+400USNBwSdAwDVDETUxnh0v+NXv5B6yIIIJOGeazvaqqrkO2Vr8OqksJgeR566C6VLcODGrhE6XPJqg/ULHsxpTzOzP03eT9CsCv2caRpQstm6A+QdVnp2y2C4BsxZqHzcvWXq7zapJEqbMJ6hFUXC5QjTXlJI3Jj1EbZ7777N2j07IJ6hFUYiNViOjBvLPt3oVFzMFXSULLJqg/EIrkSFlvWDq97iUxJnPmefNoshtFcWuiziaoS1Cx7EOIWnWtG8UaIDGtguyz7T+APpugXkFNpuZ7lGQvDykaxOY1UT9aNkE9g8yog4jogq2WQCXIPBaZ8jHl0j+ZAcCvdd4jVkQQQT8cuxppPLWW3WLZXx6mmJOuuoQ6m6AOQd/rRu6CgAAsbJ3fpSY6COpsgnoFNeo6R/OqoVfFvYe3yxXJXvZkDi2boM5AVY2gxPUOsWv7DiVdcxfjbhLwtGyC+gJZrZ/4T0AwfokCN9Fa0mc9CAAgwEuRJPG1tkAOp6+IIIJOGUWNlM+58Gmo+8Z93l76N7QVrPTZBPUMKlUgGFX143IT+KsDwjSYecvcJGmKHt+3mz3fGkHPCMqdB+Fyk0Zl+HVr5oj/BOzXIEDuFouvCWFaT18RQQSdMrIaacIiJcG4B7qzJDmET3YHz9gIQR2C2qgfgEORtqbm8IVswMXuGwJ1NkEdgu6rRXbbzXJ6/e7CFwD7/wJ9NkE9gtr67Jqu2fOSRatkd90m4JW1fgR1DCo7yLdBYT3pccrn+vnP13Q3WzAOKvYOgAKb6MkrIoigU8aun+2l6eatW0ugftw1yGEefTZBnYFa5XHsecyG3lRlH5potMRGaNkE9QhCa6K7zl7R1IjcDbsu9/qCPpugjkGqVxHLPCK+KMJFVd7NirfmPHgEEcmp+FEP8b9eb42gJwW1QQ7gEMrenXmNnLTnjdw1IvR3awQ9NaiexbpCw9uXE7++JgEGRXj7cgoAivhSIiJjcmqHtF4SxK9QPvOAoB5Bbaamdqw3e0lLSY7teVB2Wd1fMlNDUI+gQ+fB3XE6JfNY1Ah+UebHTA1BXYPCRe0ZHrqMCSJTe9TI3lgjc3TQD3EAokjbKtntrRH03KBipzJHESA6lKrs/KJLdPX8nE12Q3/Uiggi6Edjj40cmiHR9vqi0dTts8VKBJxqhKDuQE1G8bCXbA/Rbg6Fqh3rrM8mqG/Q/Xkj2bzr9nB/dk2TSW8SlsyuE9Qn6P5pHkVJA2iKR1aU1t9jHyRGRv0I6hPU9q77o/KwoLbNKjrb3HVzeBRzkAT9R0Bh2ko0L+YaEXPSocb6YFGSBNXrC+tGCOoSdP8MX2BcgTB9OQWGJBg1P9/U6+bEvgMAb0ZdD2Tt79YIemrQt2f4+qsAfkU1283BngwpAPyyiQLJ2RnEGBWsGyGoY1AQEZEJkHnMQkRmDKqL5WI2yUWt0UFEHGQGz88mqGOQ6F/P+Z0R+rs1gggiiCCCCCKIIIII+tdAfwIK55qgIrtxFAAAAABJRU5ErkJggg==',
            },
          ],
        })
        .status(200)
    } catch (error: any) {
      console.log(error.message || error)
      if (!res.headersSent) {
        return res.status(200).send({
          Success: 'false',
          Message: 'Erro ao executar rota',
        })
      }
    }
  }
)

router.post(
  '/GenerateRefundPixIn',
  async (
    req: Request<object, object, GenerateRefundPixInRequest>,
    res: Response<GenerateRefundPixInResponse | ErrorResponse>
  ) => {
    console.log('GenerateRefundPixIn request received')
    try {
      const documentNumber = Date.now()

      database.set(documentNumber, req.body)

      console.log('GenerateRefundPixIn response sent')
      res
        .send({
          Success: 'true',
          Message: 'ISI0001 - Método executado com sucesso',
          Url: 'http://www.pdfurl.com.br/pdf?filename=2022-03-29/0uws2git.pdf',
          DocumentNumber: documentNumber,
          AlreadyExists: 'false',
        })
        .status(200)

      const response: PixInWebhook = {
        Method: WebhookMethod.PixIn,
        FromName: 'John Doe',
        FromTaxNumber: '1234567890',
        FromBankNumber: '1234567890',
        FromBankBranch: '1234567890',
        FromBankAccount: '',
        FromBankAccountDigit: '',
        FromISPB: '',
        ToName: '',
        ToTaxNumber: '',
        ToBankNumber: '',
        ToBankBranch: '',
        ToBankAccount: '',
        ToBankAccountDigit: '',
        ToISPB: '',
        QRCodeInfos: {
          DocumentNumber: '',
          Type: '',
          ConciliationId: '',
          Identifier: '',
          Payer: {
            Name: '',
            TaxNumber: null,
          },
          Value: {
            PrincipalValue: 0,
            DiscountValue: null,
            RebateValue: null,
            FineValue: null,
            InterestValue: null,
          },
        },
        InitiationType: '',
        CustomerMessage: null,
        Value: 0,
        TransferDate: '',
        ReceiptUrl: '',
        EndToEndId: '',
        Tags: null,
        PartnerId: 0,
        DocumentNumber: '',
        EntryId: 0,
        Status: '',
        BusinessUnitId: 0,
      }

      await http.post('/', response)
    } catch (error: any) {
      console.log(error.message || error)
      if (!res.headersSent) {
        return res.status(200).send({
          Success: 'false',
          Message: 'Erro ao executar rota',
        })
      }
    }
  }
)

app.listen(envs.PORT, () => {
  console.log(`Server is running on port ${envs.PORT}`)
})
