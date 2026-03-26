import {
  AbstractPaymentProvider,
  PaymentSessionStatus,
} from "@medusajs/framework/utils"
import {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
} from "@medusajs/framework/types"

type CulqiOptions = {
  secretKey: string
  publicKey: string
  webhookSecret?: string
}

/**
 * Proveedor de pagos Culqi para Medusa v2
 * API Culqi: https://culqi.com/api/
 *
 * Flujo:
 * 1. Frontend tokeniza la tarjeta con Culqi.js → obtiene token
 * 2. Backend crea un "Cargo" con el token
 * 3. Medusa registra el resultado
 */
class CulqiProviderService extends AbstractPaymentProvider<CulqiOptions> {
  static identifier = "culqi"

  private secretKey: string
  private publicKey: string
  private webhookSecret: string
  private baseUrl = "https://api.culqi.com/v2"

  constructor(container: any, options: CulqiOptions) {
    super(container, options)
    this.secretKey = options.secretKey
    this.publicKey = options.publicKey
    this.webhookSecret = options.webhookSecret || ""
  }

  private async culqiRequest(
    method: string,
    path: string,
    body?: object
  ): Promise<any> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(
        `Culqi error [${response.status}]: ${(data as any).user_message || JSON.stringify(data)}`
      )
    }
    return data
  }

  // Iniciar sesión de pago — reservamos el monto
  async initiatePayment(
    input: InitiatePaymentInput
  ): Promise<InitiatePaymentOutput> {
    return {
      id: `culqi_pending_${Date.now()}`,
      data: {
        amount: input.amount,
        currency: input.currency_code.toUpperCase(),
        status: "pending",
      },
    }
  }

  // Autorizar usando el token generado por Culqi.js en el frontend
  async authorizePayment(
    input: AuthorizePaymentInput
  ): Promise<AuthorizePaymentOutput> {
    const { token, email } = input.data as {
      token: string
      email: string
    }

    try {
      const charge = await this.culqiRequest("POST", "/charges", {
        amount: Math.round(Number(input.amount) * 100), // Culqi espera centavos
        currency_code: "PEN", // Soles peruanos
        email,
        source_id: token,
        description: "Compra en BagsStore Peru",
        metadata: {
          order_id: input.context?.session_id || "",
        },
      })

      return {
        status: PaymentSessionStatus.AUTHORIZED,
        data: {
          culqi_charge_id: charge.id,
          amount: charge.amount,
          currency: charge.currency_code,
          status: charge.outcome?.type,
        },
      }
    } catch (error) {
      return {
        status: PaymentSessionStatus.ERROR,
        data: { error: (error as Error).message },
      }
    }
  }

  async capturePayment(
    input: CapturePaymentInput
  ): Promise<CapturePaymentOutput> {
    // Culqi captura automáticamente al crear el cargo
    return { data: input.data }
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    const chargeId = (input.data as any)?.culqi_charge_id
    if (chargeId) {
      try {
        await this.culqiRequest("DELETE", `/charges/${chargeId}`)
      } catch (_) {
        // Si ya fue capturado, ignorar error de cancelación
      }
    }
    return { data: { ...input.data, status: "cancelled" } }
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    const chargeId = (input.data as any)?.culqi_charge_id
    if (!chargeId) throw new Error("No hay charge ID para reembolsar")

    const refund = await this.culqiRequest("POST", "/refunds", {
      amount: Math.round(Number(input.amount) * 100),
      charge_id: chargeId,
      reason: "solicitud_del_comprador",
    })

    return {
      data: {
        ...input.data,
        refund_id: refund.id,
        refund_amount: refund.amount,
      },
    }
  }

  async getPaymentStatus(
    input: GetPaymentStatusInput
  ): Promise<GetPaymentStatusOutput> {
    const chargeId = (input.data as any)?.culqi_charge_id
    if (!chargeId) {
      return { status: PaymentSessionStatus.PENDING }
    }
    try {
      const charge = await this.culqiRequest("GET", `/charges/${chargeId}`)
      const statusMap: Record<string, PaymentSessionStatus> = {
        paid: PaymentSessionStatus.CAPTURED,
        pending: PaymentSessionStatus.PENDING,
        failed: PaymentSessionStatus.ERROR,
      }
      return {
        status: statusMap[charge.outcome?.type] || PaymentSessionStatus.PENDING,
      }
    } catch {
      return { status: PaymentSessionStatus.ERROR }
    }
  }

  async retrievePayment(
    input: RetrievePaymentInput
  ): Promise<RetrievePaymentOutput> {
    const chargeId = (input.data as any)?.culqi_charge_id
    if (!chargeId) return { data: input.data }
    const charge = await this.culqiRequest("GET", `/charges/${chargeId}`)
    return { data: charge }
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    return { data: input.data }
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return { data: input.data }
  }

  async getWebhookActionAndData(payload: {
    data: Record<string, unknown>
    rawData: string | Record<string, unknown>
    headers: Record<string, unknown>
  }): Promise<WebhookActionResult> {
    // Culqi envía eventos via webhook — procesar aquí
    return { action: "not_supported" }
  }
}

export default CulqiProviderService
