import { defineConfig, presetMini, presetTypography, presetIcons } from 'unocss'

export default defineConfig({
    presets: [
        presetMini({
            dark: 'class'
        }),
        presetIcons({
            collections: {
                carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
            }
        }),
        presetTypography()
    ]
})