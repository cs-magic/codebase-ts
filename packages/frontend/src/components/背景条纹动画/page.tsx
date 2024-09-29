import BackgroundLines from "./components/background-lines";

export default function Home() {
  return (
    <>
      <BackgroundLines>
        <div className="container mx-auto mt-24 p-4 rounded-lg border text-2xl text-gray-300">
          内容插入区域，此标签可替换，容器大小布局等可自定义
        </div>
      </BackgroundLines>
      <hr className="border-neutral-800" />
    </>
  );
}
