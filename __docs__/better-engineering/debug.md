# Debug

当想确定什么进程没有退出的时候：

```shell
import wtfnode from "wtfnode"

export const debugProcesses = () => {
  wtfnode.dump()
}

```
