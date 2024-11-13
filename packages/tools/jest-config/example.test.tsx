// 示例测试文件 example.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const MyComponent = () => <div>Hello World!</div>;

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("handles user interaction", async () => {
    const user = userEvent.setup();
    render(<MyComponent />);

    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Clicked!")).toBeInTheDocument();
  });
});
