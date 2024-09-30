import { ImageEqualHeight } from "@cs-magic/react/components/image-equal-height"
import { SeparatorContainer } from "@cs-magic/react/components/separator-container"

export const BrandingPartners = () => {
  const sponsors: string[] = []

  return (
    <>
      {!!sponsors.length && (
        <>
          <SeparatorContainer>合作伙伴</SeparatorContainer>
          <div className={"mt-auto flex h-8 justify-center gap-4"}>
            {sponsors.map((item) => (
              <ImageEqualHeight src={item} key={item} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
