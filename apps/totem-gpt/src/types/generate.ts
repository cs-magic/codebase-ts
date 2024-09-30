import * as z from 'zod';

export const generateFormSchema = z.object({
  name: z.string().min(1),
  options: z
    .object({
      description: z.string().optional(),
      favoriteColor: z.string().optional(),
    })
    .optional(),
});
export type GenerateFormRequest = z.infer<typeof generateFormSchema>;

export interface GenerateRequest_deprecated {
  /**
   * URL that the QR code will point to.
   */
  url: string;

  /**
   * Accompanying text prompt that will decide the style or theme of the code.
   */
  prompt: string;

  /**
   * Conditioning scale for qr controlnet
   */
  qr_conditioning_scale?: number;

  /**
   * Steps to run denoising
   */

  num_inference_steps?: number;
}

export interface GenerateResponse {
  // ai 的全部回复
  text: string;

  status: 'idle' | 'prepare' | 'running' | 'finished';

  error?: string;

  // 生成的 response 的 id
  id: string;
}
