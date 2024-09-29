import styles from "./background-lines.module.css";

type Props = {
  children?: React.ReactNode;
};

export default function BackgroundLines({ children }: Props) {
  return (
    <div className="min-h-[800px] bg-black relative overflow-hidden before:absolute before:inset-0 before:z-10 before:bg-[linear-gradient(to_top,rgba(0,0,0,0)_0px,#000_65%)] after:absolute after:w-full after:h-48 after:bottom-0 after:bg-[linear-gradient(transparent,#000)]">
      <div className={styles.leftLights}></div>
      <div className={styles.rightLights}></div>
      <div className={styles.backgroundLines}></div>
      <div className="relative z-50">{children}</div>
    </div>
  );
}
