import type { FileBoxInterface }      from 'file-box'
import type { Readable }     from 'stronger-typed-streams'

import {
  packFileBoxToChunk,
  unpackFileBoxFromChunk,
}                           from 'src/deprecated/file-box-chunk'
import {
  packFileBoxChunkToPb,
  unpackFileBoxChunkFromPb,
}                           from 'src/deprecated/chunk-pb'
import type { FileBoxPb }        from 'src/deprecated/file-box-pb.type'

/**
 * @deprecated Will be removed after Dec 31, 2022
 */
function packFileBoxToPb<T extends FileBoxPb> (
  PbConstructor: { new(): T },
) {
  return async (fileBox: FileBoxInterface) => {
    const fileBoxChunkStream = await packFileBoxToChunk(fileBox)
    const pbFileBox = packFileBoxChunkToPb(PbConstructor)(fileBoxChunkStream)
    return pbFileBox
  }
}

/**
 * @deprecated Will be removed after Dec 31, 2022
 */
async function unpackFileBoxFromPb<T extends FileBoxPb> (
  pbStream: Readable<T>,
): Promise<FileBoxInterface> {
  const fileBoxChunkStream = unpackFileBoxChunkFromPb(pbStream)
  const fileBox = await unpackFileBoxFromChunk(fileBoxChunkStream)
  return fileBox
}

export {
  packFileBoxToPb,
  unpackFileBoxFromPb,
}
