import axios, { AxiosError } from 'axios'
import { DeeplOptions, DeeplResponse } from './faces'

export class Deepl {
  constructor(private readonly options: DeeplOptions) {
    if (!options.apiKey) {
      throw new Error('API key is required')
    }
  }

  async translate(text: string, options?: DeeplOptions): Promise<DeeplResponse> {
    const opts = { ...this.options, ...options }

    if (!opts.apiKey) {
      throw new Error('API key is required')
    }
    if (!opts.to) {
      throw new Error('"to" (target) language is required')
    }
    if (!opts.from && opts.glossaryId) {
      throw new Error('"from" (source) language is required when using a glossary ID')
    }

    const data = this.formatRequestData(text, opts)

    try {
      const response = await axios.post(
        opts.apiKey?.endsWith(':fx') ? 'https://api-free.deepl.com/v2/translate' : 'https://api.deepl.com/v2/translate',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `DeepL-Auth-Key ${opts.apiKey}`,
          },
        },
      )

      return response.data
    } catch (e: any) {
      if (e.response) {
        this.handleAxiosError(e as AxiosError)
      }
      throw e
    }
  }

  private formatRequestData(text: string, options: DeeplOptions) {
    const data: any = {
      text: [text],
      target_lang: options.to,
    }

    if (options.from) {
      data.source_lang = options.from
    }
    if (options.splitSentences) {
      data.split_sentences = options.splitSentences
    }
    if (options.preserveFormatting) {
      data.preserve_formatting = options.preserveFormatting
    }
    if (options.formality) {
      data.formality = options.formality
    }
    if (options.glossaryId) {
      data.glossary_id = options.glossaryId
    }
    if (options.tagHandling) {
      data.tag_handling = options.tagHandling
    }
    if (options.outlineDetection) {
      data.outline_detection = options.outlineDetection
    }
    if (options.nonSplittingTags) {
      data.non_splitting_tags = options.nonSplittingTags
    }
    if (options.ignoreTags) {
      data.ignore_tags = options.ignoreTags
    }
    if (options.splittingTags) {
      data.splitting_tags = options.splittingTags
    }

    return data
  }

  private handleAxiosError(error: AxiosError) {
    if (error.response?.status) {
      // If 429 = Too Many Requests, throw a more specific error
      if (error.response.status === 429) {
        throw new Error(`Error ${error.response.status}: Too Many Requests. Please wait a while before trying again.`)
      } else if (error.response.status === 403) {
        throw new Error(`Error ${error.response.status}: Forbidden. Please check your API key.`)
      } else if (error.response.status === 404) {
        throw new Error(`Error ${error.response.status}: Not Found. Please check your API key.`)
      } else if (error.response.status === 456) {
        throw new Error(
          `Error ${error.response.status}: Quota exceeded. The translation limit of your account has been reached.`,
        )
      } else if (error.response.status > 500) {
        throw new Error(`Error ${error.response.status}: Internal Server Error. Please try again later.`)
      }
    }
  }
}
