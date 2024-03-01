import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { signIn } from "next-auth/react"

export const CheckAuth = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) => (
  <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent>
      <AlertDialogTitle>发送失败</AlertDialogTitle>
      <AlertDialogDescription>您需要先登陆才能发送哦！</AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogAction onClick={() => signIn()}>
          点击跳转登录
        </AlertDialogAction>
        <AlertDialogCancel>放弃</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)
