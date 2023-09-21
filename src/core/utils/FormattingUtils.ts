const formattingUtils = {
  removeWhitespaces: (value?: string): string => {
    if (!value) {
      return ""
    }

    return value.replace(/\s/g, "")
  },

  trimString: (inputStr?: string, targetLength?: number) => {
    const DEFAULT_LENGTH = 16
    if (!inputStr) {
      return ""
    }

    const l = targetLength ?? DEFAULT_LENGTH
    if (inputStr.length > l) {
      return inputStr.substr(0, l - 1) + "..."
    }
    return inputStr
  },

  unprefixString: (inputStr: string) => {
    return inputStr.replace(/(^|\W)@/g, "")
  },

  centerEllipsizeString: (input?: string | null, numberChars = 6) => {
    if (!input) {
      return ""
    }
    if (input.length < 10) {
      return input
    }
    return `${input.substring(0, numberChars)}...${input.slice(0 - numberChars)}`
  },

  getUrlExtension: (url: string) => {
    return url.split(/[#?]/)[0]?.split(".")?.pop()?.trim()!
  },
}

export default formattingUtils
