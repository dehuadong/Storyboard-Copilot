import type { ImageModelDefinition } from '../../types';
import { createGrsaiPointsPricing } from '@/features/canvas/pricing';

export const GRSAI_NANO_BANANA_PRO_MODEL_ID = 'grsai/nano-banana-pro';

const NANO_BANANA_ASPECT_RATIOS = [
  '1:1',
  '16:9',
  '9:16',
  '4:3',
  '3:4',
  '3:2',
  '2:3',
  '5:4',
  '4:5',
  '21:9',
] as const;

const GRSAI_PRO_POINTS_BY_MODEL: Record<string, number> = {
  'nano-banana-pro': 1800,
  'nano-banana-pro-vt': 1800,
  'nano-banana-pro-cl': 3400,
  'nano-banana-pro-vip': 7000,
  'nano-banana-pro-4k-vip': 8600,
};

export const imageModel: ImageModelDefinition = {
  id: GRSAI_NANO_BANANA_PRO_MODEL_ID,
  mediaType: 'image',
  displayName: 'Nano Banana Pro',
  providerId: 'grsai',
  description: 'Nano Banana Pro 图像生成与编辑',
  eta: '1min',
  expectedDurationMs: 60000,
  defaultAspectRatio: '1:1',
  defaultResolution: '1K',
  aspectRatios: NANO_BANANA_ASPECT_RATIOS.map((value) => ({ value, label: value })),
  resolutions: [
    { value: '1K', label: '1K' },
    { value: '2K', label: '2K' },
    { value: '4K', label: '4K' },
  ],
  pricing: createGrsaiPointsPricing(({ extraParams }) => {
    const variant = typeof extraParams?.grsai_pro_model === 'string'
      ? extraParams.grsai_pro_model.trim().toLowerCase()
      : 'nano-banana-pro';
    return GRSAI_PRO_POINTS_BY_MODEL[variant] ?? GRSAI_PRO_POINTS_BY_MODEL['nano-banana-pro'];
  }),
  resolveRequest: ({ referenceImageCount }) => ({
    requestModel: GRSAI_NANO_BANANA_PRO_MODEL_ID,
    modeLabel: referenceImageCount > 0 ? '编辑模式' : '生成模式',
  }),
};
