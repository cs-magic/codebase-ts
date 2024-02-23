import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog"
import { LoaderIcon } from "lucide-react"
import { useUiStore } from "@/store/ui.slice"

export const LoadingAlertDialog = () => {
  const { loading } = useUiStore((state) => ({
    loading: state.loading,
  }))

  return (
    <AlertDialog open={loading}>
      <AlertDialogContent
        className={
          "flex items-center justify-center bg-transparent border-none"
        }
      >
        <LoaderIcon className={"animate-spin"} />
      </AlertDialogContent>
    </AlertDialog>
  )
}
