export enum FitbankIdentifierType {
  USER = 'user',
  COMPANY = 'company',
  TRANSACTION = 'transaction',
  REFUND_PIX_IN = 'refund_pix_in',
}

export type ErrorResponse = {
  Success: 'false'
  Message: string
}

export enum AddressType {
  Commercial = 0,
  Residential = 1,
}

export type SuccessResponse = 'true' | 'false'

export enum RateType {
  Value = 'value',
  Percent = 'percent',
}

export enum TransactionPurpose {
  PurchaseOrTransfer = 0,
  Withdraw = 2,
}

export enum AccountType {
  Current = 0,
  Salary = 1,
  Saving = 2,
  Payment = 3,
}

export enum RateValueType {
  Sent = 0,
  Default = 1,
  None = 2,
}

export enum ChangeType {
  NotAllowed = 0,
  Allowed = 1,
}

export enum AgentModality {
  AgentType1 = 1,
  AgentType2 = 2,
}

export enum TransactionChangeType {
  NotAllowed = 0,
  Allowed = 1,
}

export enum PixKeyType {
  SocialSecurity = 0,
  TaxNumber = 1,
  Email = 2,
  PhoneNumber = 3,
  RamdomKeyCode = 4,
}

export type AdditionalDataItem = string

export interface Rate {
  Sent: boolean
  Value: number
  Type: RateType
}

export interface Address {
  AddressLine?: string
  AddressLine2?: string
  ZipCode: string
  Neighborhood?: string
  CityCode?: string
  CityName?: string
  State?: string
  AddressType?: AddressType
  Country?: string
  Complement?: string
  Reference?: string
}

export interface GenerateDynamicPixQRCodeRequest {
  PixKey: string
  TaxNumber: string
  PayerTaxNumber?: string | null
  PayerName?: string | null
  PrincipalValue: number
  Rate?: Rate
  ExpirationDate: string
  Address: Address
  Bank: string
  BankBranch: string
  BankAccount: string
  BankAccountDigit: string
  ChangeType?: ChangeType
  AdditionalData?: AdditionalDataItem
  PayerRequest?: string
  TransactionPurpose: TransactionPurpose
  TransactionValue?: number | null
  AgentModality: AgentModality
  TransactionChangeType?: TransactionChangeType | null
  Identifier?: string
}

export interface GenerateDynamicPixQRCodeResponse {
  Success: SuccessResponse
  Message: string
  DocumentNumber: number
}

export interface GenerateStaticPixQRCodeRequest {
  PrincipalValue: number
  TaxNumber: string
  PixKey: string
  Address: Address
  Bank: string
  BankBranch: string
  BankAccount: string
  BankAccountDigit: string
  AdditionalData?: AdditionalDataItem
  TransactionPurpose: TransactionPurpose
  Identifier: string
}

export type GenerateStaticPixQRCodeResponse = {
  Success: SuccessResponse
  Message: string
  DocumentNumber: number
}

export type GetPixKeysRequest = {
  TaxNumber: string
  Bank: string
  BankBranch: string
  BankAccount: string
  BankAccountDigit: string
}

export type GetPixKeysResponse = {
  Success: SuccessResponse
  PixKey: string
  PixKeyType: PixKeyType
  Status: string
  Bank: string
  BankBranch: string
  BankAccount: string
  BankAccountDigit: string
}

export interface GeneratePixOutRequest {
  TaxNumber: string
  Bank: string
  BankBranch: string
  BankAccount: string
  BankAccountDigit: string
  ToTaxNumber: string
  ToName: string
  ToBank: string
  ToBankAccount: string
  ToBankAccountDigit: string
  DeviceIdentifier: string
  Value: number
  ToBankBranch: string
  PixKey?: string | null
  PixKeyType?: PixKeyType | null
  AccountType: AccountType
  Identifier: string
  PaymentDate: string
  RateValue?: number
  RateValueType?: RateValueType
  ToISPB?: string
  Description?: string
  Tags?: string[]
  SearchProtocol?: number | null
  CustomerMessage?: string
}

export interface GeneratePixOutResponse {
  Success: SuccessResponse
  Message: string
  DocumentNumber: number
  Url: string
  Validation?: {
    Key: string
    Value: string[]
  }[]
}

export interface GetAccountBalanceListAccount {
  TaxNumber: string
  Bank: string
  BankBranch: string
  BankAccount: string
  BankAccountDigit: string
}

export interface GetAccountBalanceListRequest {
  Accounts: GetAccountBalanceListAccount[]
}

export interface GetAccountBalanceListAccountResponse {
  TaxNumber: string
  Bank: string
  BankBranch: string
  BankAccount: string
  BankAccountDigit: string
  Balance: number
  BlockedBalance: number
}

export interface GetAccountBalanceListResponse {
  Success: SuccessResponse
  Message: string
  AccountList: GetAccountBalanceListAccountResponse[]
}

export interface GetPixQRCodeByIdRequest {
  DocumentNumber: number
  TaxNumber: string
}

export interface GetPixQRCodeByIdStaticResponse {
  Identifier: string
  PixKey: string
  City: string
  ZipCode: string
  ReceiverName: string
  ReceiverTaxNumber: string
  QRCodeBase64: string
  HashCode: string
  CreationDate: string
  PrincipalValue: string
  Status: string
  PixQRCodeType: string
}

export interface GetPixQRCodeByIdDynamicResponse {
  Identifier: string
  PixQRCodeType: string
  PixKey: string
  Status: string
  City: string
  ZipCode: string
  PayerName: string
  PayerTaxNumber: string
  ReceiverName: string
  ReceiverTaxNumber: string
  ChangeType: string
  PrincipalValue: string
  DueDate: string
  RebateValue: number
  InterestValue: number
  FineValue: number
  Reusable: boolean
  PayerRequest: string
  ExpirationDate: string
  TransactionChangeType: string
  TransactionValue: string
  TransactionPurpose: string
  AgentModality: string
  CreationDate: string
  QRCodeBase64: string
  HashCode: string
}

export interface GetPixQRCodeByIdentifierInfosItem {
  Identifier: string
  PixQRCodeType: string
  PixKey: string
  Status: string
  City: string
  ZipCode: string
  PayerName: string
  PayerTaxNumber: string
  ReceiverName: string
  ReceiverTaxNumber: string
  ChangeType: string
  PrincipalVelue: string
  DueDate: string
  RebateValue: string
  InterestValue: string
  FineValue: string
  Reusable: string
  PayerRequest: string
  ExpirationDate: string
  TransactionChangeType: string
  TransactionValue: string
  TransactionPurpose: string
  AgentModality: string
  CreationDate: string
  QRCodeBase64: string
}

export interface GetPixQRCodeByIdResponse {
  Success: SuccessResponse
  GetPixQRCodeByIdInfo:
    | GetPixQRCodeByIdStaticResponse
    | GetPixQRCodeByIdDynamicResponse
}

export interface GenerateRefundPixInRequest {
  ToTaxNumber?: string
  ToName?: string
  ToBank?: string
  ToBankBranch?: string
  ToBankAccount?: string
  ToBankAccountDigit?: string
  RefundValue: number
  CustomerMessage?: string
  Tags?: string[]
  TaxNumber: string
  DocumentNumber: number
  Bank: string
  BankBranch: string
  BankAccount: string
  BankAccountDigit: string
  Identifier: string
}

export interface GenerateRefundPixInResponse {
  Success: SuccessResponse
  Message: string
  Url: string
  DocumentNumber: number
  AlreadyExists: SuccessResponse
}

export interface GetPixQRCodeByIdentifierRequest {
  TaxNumber: string
  DocumentNumber: number
  Identifier: string
}

export type GetPixQRCodeByIdentifierResponse = {
  Success: SuccessResponse
  GetPixQRCodeByIdentifierInfos: GetPixQRCodeByIdentifierInfosItem[]
}

export interface WebhookHandler<T> {
  handle(payload: T): Promise<void>
}

export enum WebhookMethod {
  PixIn = 'PixIn',
  PixOut = 'PixOut',
}

export enum PixKeyActionType {
  CreatePixKey = 0,
  ChangePixKey = 1,
  CancelPixKey = 2,
  ClaimPixKey = 3,
  CancelInternalClaimPixKey = 4,
  CancelExternalClaimPixKey = 5,
  ConfirmExternalClaimPixKey = 6,
  CheckExternalPixKeyClaim = 7,
}

export enum PixKeyStatusType {
  Created = 0,
  Registering = 1,
  Registered = 2,
  Disabled = 3,
  Canceled = 4,
  Error = 5,
  Claiming = 6,
  ErrorOwnership = 7,
  ErrorPortability = 8,
}

export enum PixOutStatusType {
  Created = 'Created',
  Registered = 'Registered',
  Paid = 'Paid',
  Canceled = 'Canceled',
  Error = 'Error',
}

export enum PaymentOrderStatusType {
  Created = 'Created',
  Registered = 'Registered',
  Settled = 'Settled',
  Canceled = 'Canceled',
  Error = 'Error',
}

export enum TopUpStatusType {
  Created = 'Created',
  Registered = 'Registered',
  Settled = 'Settled',
  Canceled = 'Canceled',
  Error = 'Error',
}

export enum AccountStatusType {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

interface BaseWebhook {
  Method: WebhookMethod
  BusinessUnitId: number
}

export interface PixOutWebhook extends BaseWebhook {
  Method: WebhookMethod.PixOut
  FromName: string
  FromTaxNumber: string
  FromBankCode: string
  FromBankBranch: string
  FromBankAccount: string
  FromBankAccountDigit: string
  FromISPB: string
  ToName: string
  ToTaxNumber: string
  ToBankCode: string
  ToBankBranch: string
  ToBankAccount: string
  ToBankAccountDigit: string
  ToISPB: string
  RefundDate: string
  ReceiptUrl: string
  EndToEndId: string
  Tags: string[] | null
  ErrorDescription: string | null
  ErrorCode: string | null
  InitiationEndToEndId: string | null
  InitiationDocumentNumber: string | null
  RefundCode: string | null
  PartnerId: number
  DocumentNumber: string
  Identifier: string
  EntryId: number
  Status: string
  TotalValue: number
  PaymentDate: string
  BusinessUnitId: number
}

export interface PixInWebhook extends BaseWebhook {
  Method: WebhookMethod.PixIn
  FromName: string
  FromTaxNumber: string
  FromBankNumber: string
  FromBankBranch: string
  FromBankAccount: string
  FromBankAccountDigit: string
  FromISPB: string
  ToName: string
  ToTaxNumber: string
  ToBankNumber: string
  ToBankBranch: string
  ToBankAccount: string
  ToBankAccountDigit: string
  ToISPB: string
  QRCodeInfos: {
    DocumentNumber: string
    Type: string
    ConciliationId: string
    Identifier: string
    Payer: {
      Name: string
      TaxNumber: string | null
    }
    Value: {
      PrincipalValue: number
      DiscountValue: number | null
      RebateValue: number | null
      FineValue: number | null
      InterestValue: number | null
    }
  }
  InitiationType: string
  CustomerMessage: string | null
  Value: number
  TransferDate: string
  ReceiptUrl: string
  EndToEndId: string
  Tags: string[] | null
  PartnerId: number
  DocumentNumber: string
  EntryId: number
  Status: string
}

// export interface RefundPixInWebhook extends BaseWebhook {
//   Method: WebhookMethod.RefundPixIn
//   FromName: string
//   FromTaxNumber: string
//   FromBankNumber: string
//   FromBankBranch: string
//   FromBankAccount: string
//   FromBankAccountDigit: string
//   FromISPB: string
//   ToName: string
//   ToTaxNumber: string
//   ToBankNumber: string
//   ToBankBranch: string
//   ToBankAccount: string
//   ToBankAccountDigit: string
//   ToISPB: string
//   Value: number
//   Status: string
//   RefundDate: string
//   DocumentNumber: string
//   Identifier: string | null
// }

// export interface RefundPixOutWebhook extends BaseWebhook {
//   Method: WebhookMethod.RefundPixOut
//   TransactionId: number
//   Value: number
//   Status: string
//   BankDestination: string
//   AgencyDestination: string
//   AccountDestination: string
//   PixKeyDestination: string
//   BankOrigin: string
//   AgencyOrigin: string
//   AccountOrigin: string
//   PixKeyOrigin: string
//   RefundDate: string
//   ReceiptUrl: string
//   EndToEndId: string
//   Tags: string[] | null
//   ErrorDescription: string | null
//   ErrorCode: string | null
//   PartnerId: number
//   DocumentNumber: string
//   Identifier: string | null
// }

export type AnyWebhookPayload = PixOutWebhook | PixInWebhook
