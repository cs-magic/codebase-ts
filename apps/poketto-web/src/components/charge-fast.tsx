// import { zodResolver } from "@hookform/resolvers/zod"
// import { TRPCClientError } from "@trpc/client"
// import { useTranslation } from "next-i18next"
// import * as React from "react"
// import { useForm } from "react-hook-form"
// import { toast } from "sonner"
// import { z } from "zod"
//
// import { Button } from "@cs-magic/shadcn/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@cs-magic/shadcn/ui/form"
// import { Input } from "@cs-magic/shadcn/ui/input"
//
// import { ChargeContainer } from "@/components/containers"
// import { useUser } from "@/hooks/use-user"
// import { api } from "@/lib/api"
//
// const fastChargeSchema = z.object({
//   coupon: z.string().optional(),
// })
//
// const FastChargeForm = () => {
//   const { t } = useTranslation()
//   const { mutateAsync: addCoupon, isLoading } = api.bill.addCoupon.useMutation()
//   const { userId } = useUser()
//   const { data: user } = api.user.getProfile.useQuery({ id: userId }, { enabled: !!userId })
//
//   const util = api.useContext()
//   const form = useForm<z.infer<typeof fastChargeSchema>>({
//     resolver: zodResolver(fastChargeSchema),
//   })
//
//   async function onSubmit(values: z.infer<typeof fastChargeSchema>) {
//     const { coupon } = values
//     if (coupon) {
//       try {
//         await addCoupon({ coupon })
//         await util.user.getProfile.invalidate()
//         toast.success("加油成功，祝您旅途愉快！ ：）")
//       } catch (e) {
//         // 已经在
//         console.error(e)
//         if (e instanceof TRPCClientError) toast.error(e.message)
//       }
//     }
//   }
//
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4 w-full md:w-[360px] mx-auto">
//         <FormItem>
//           <FormLabel>当前 Dora：</FormLabel>
//           <FormControl>
//             <span>{user ? user.balance : 0}</span>
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//
//         <FormField
//           control={form.control}
//           name="coupon"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>加油券</FormLabel>
//               <FormControl>
//                 <div className={"flex items-center gap-2"}>
//                   <Input placeholder="cp_xxx" {...field} />
//                   <Button type="submit" disabled={isLoading} className={"whitespace-nowrap"}>
//                     确认
//                   </Button>
//                 </div>
//               </FormControl>
//               <FormDescription>使用您或他人的加油券，无需支付流程，直接为您账号续航！</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//
//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <span className="w-full border-t" />
//           </div>
//           <div className="relative flex justify-center text-xs uppercase">
//             <span className="bg-background px-2 text-muted-foreground">{t("common:OrYouCanAlso")}</span>
//           </div>
//         </div>
//
//         <ChargeContainer className={"w-full"} asChild>
//           <Button variant={"outline"} className={"w-full"}>
//             充值
//           </Button>
//         </ChargeContainer>
//       </form>
//     </Form>
//   )
// }
//
// export default FastChargeForm
