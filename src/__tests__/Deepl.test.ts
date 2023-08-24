import 'dotenv/config'
import { Deepl } from '..'

const apiKey = process.env.API_KEY

test('Deepl.translate', async () => {
  const deepl = new Deepl({ apiKey })
  const response = await deepl.translate('Hello world', { to: 'ES' })

  expect(response.text).toBe('Hola mundo')
})

test('Deepl.translateMany', async () => {
  const deepl = new Deepl({ apiKey })
  const response = await deepl.translateMany(['Hello world', 'Goodbye world'], { to: 'ES' })

  expect(response.translations[0].text).toBe('Hola mundo')
  expect(response.translations[1].text).toBe('Adiós mundo')
})
