interface RecaptchaVerifyResponse {
  success: boolean
  score?: number
  action?: string
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
}

const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY ?? ''
const MIN_SCORE = Number(process.env.RECAPTCHA_MIN_SCORE ?? '0.5')

export async function verifyRecaptcha(
  token: string | null,
  expectedAction: string,
): Promise<{ ok: true; score: number } | { ok: false; reason: string }> {
  if (!SECRET_KEY) {
    return { ok: false, reason: 'reCAPTCHA secret key not configured' }
  }
  if (!token) {
    return { ok: false, reason: 'Missing reCAPTCHA token' }
  }

  const params = new URLSearchParams({
    secret: SECRET_KEY,
    response: token,
  })

  let data: RecaptchaVerifyResponse
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })
    data = (await res.json()) as RecaptchaVerifyResponse
  } catch {
    return { ok: false, reason: 'reCAPTCHA verify request failed' }
  }

  if (!data.success) {
    return { ok: false, reason: `reCAPTCHA failed: ${data['error-codes']?.join(',') ?? 'unknown'}` }
  }

  if (data.action && data.action !== expectedAction) {
    return { ok: false, reason: `Action mismatch: ${data.action}` }
  }

  const score = data.score ?? 0
  if (score < MIN_SCORE) {
    return { ok: false, reason: `Score too low: ${score}` }
  }

  return { ok: true, score }
}
