import 'dotenv/config'
import { Deepl } from '..'

test('Deepl.translate', async () => {
  const deepl = new Deepl({ apiKey: process.env.API_KEY })
  const response = await deepl.translate('Hello world', { to: 'ES' })

  expect(response.translations[0].text).toBe('Hola mundo')
})
