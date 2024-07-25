
import { deepMerge } from "@toone/report-util"
export const defaultConfig = {
  exportSettings: {
    type: 'allPage', // curPage | allPage
  },
}

export const setDefaultConfig = (config) => {
  return deepMerge(defaultConfig, config)
}


