import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  presetWebFonts,
} from 'unocss'


import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'

export function createConfig({ strict = true, dev = true } = {}) {
  return defineConfig({
    envMode: dev ? 'dev' : 'build',
    presets: [
      presetUno(),
      presetAttributify({ strict }),
      presetIcons({ autoInstall: true }),
      presetWebFonts({ fonts: { sans: 'Inter:100,200,500,400,700,800' } }),
    ],
    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
      transformerAttributifyJsx()
    ],
  });
}

export default createConfig();
