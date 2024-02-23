import { Container } from "@/components/containers"
import { Textarea } from "@/components/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { llmModels } from "@/config/llm"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function HomePage() {
  return (
    <Container orientation={"vertical"}>
      <div>Wat To AGI !</div>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder={"Models"} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Models</SelectLabel>

            {llmModels.map((llmModel) => (
              <SelectItem key={llmModel.id} value={llmModel.id}>
                {llmModel.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Textarea />
    </Container>
  )
}
