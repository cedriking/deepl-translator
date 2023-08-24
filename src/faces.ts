export interface DeeplOptions {
  apiKey?: string
  from?:
    | 'BG'
    | 'CS'
    | 'DA'
    | 'DE'
    | 'EL'
    | 'EN'
    | 'ES'
    | 'ET'
    | 'FI'
    | 'FR'
    | 'HU'
    | 'ID'
    | 'IT'
    | 'JA'
    | 'KO'
    | 'LT'
    | 'LV'
    | 'NB'
    | 'NL'
    | 'PL'
    | 'PT'
    | 'RO'
    | 'RU'
    | 'SK'
    | 'SL'
    | 'SV'
    | 'TR'
    | 'UK'
    | 'ZH'
  to?:
    | 'BG'
    | 'CS'
    | 'DA'
    | 'DE'
    | 'EL'
    | 'EN'
    | 'EN-GB'
    | 'EN-US'
    | 'ES'
    | 'ET'
    | 'FI'
    | 'FR'
    | 'HU'
    | 'ID'
    | 'IT'
    | 'JA'
    | 'KO'
    | 'LT'
    | 'LV'
    | 'NB'
    | 'NL'
    | 'PL'
    | 'PT'
    | 'PT-BR'
    | 'PT-PT'
    | 'RO'
    | 'RU'
    | 'SK'
    | 'SL'
    | 'SV'
    | 'TR'
    | 'UK'
    | 'ZH'
  splitSentences?: true | false | 'nonewlines'
  preserveFormatting?: true | false
  formality?: 'default' | 'more' | 'less' | 'prefer_more' | 'prefer_less'
  tagHandling?: 'xml' | 'html'
  outlineDetection?: true | false
  nonSplittingTags?: string[]
  ignoreTags?: string[]
  splittingTags?: string[]
  glossaryId?: string
}

export interface DeeplResponse {
  translations: {
    detected_source_language: string
    text: string
  }[]
}
