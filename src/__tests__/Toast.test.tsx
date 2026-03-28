import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider, useToast } from "@/components/Toast";

function TestToastComponent() {
  const { showToast } = useToast();
  
  return (
    <div>
      <button onClick={() => showToast("Success message", "success")}>Show Success</button>
      <button onClick={() => showToast("Error message", "error")}>Show Error</button>
      <button onClick={() => showToast("Info message", "info")}>Show Info</button>
    </div>
  );
}

describe("ToastContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error when used outside provider", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
    
    expect(() => {
      render(<TestToastComponent />);
    }).toThrow("useToast must be used within a ToastProvider");
    
    consoleError.mockRestore();
  });

  it("should show toast when showToast is called", async () => {
    render(
      <ToastProvider>
        <TestToastComponent />
      </ToastProvider>
    );

    await userEvent.click(screen.getByText("Show Success"));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveTextContent("Success message");
    }, { timeout: 2000 });
  });

  it("should show error toast", async () => {
    render(
      <ToastProvider>
        <TestToastComponent />
      </ToastProvider>
    );

    await userEvent.click(screen.getByText("Show Error"));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Error message");
    }, { timeout: 2000 });
  });

  it("should show info toast", async () => {
    render(
      <ToastProvider>
        <TestToastComponent />
      </ToastProvider>
    );

    await userEvent.click(screen.getByText("Show Info"));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Info message");
    }, { timeout: 2000 });
  });

  it("should allow manual dismissal", async () => {
    render(
      <ToastProvider>
        <TestToastComponent />
      </ToastProvider>
    );

    await userEvent.click(screen.getByText("Show Success"));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    }, { timeout: 2000 });

    const dismissButton = screen.getByRole("button", { name: /dismiss/i });
    await userEvent.click(dismissButton);

    await waitFor(() => {
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it("should show multiple toasts", async () => {
    render(
      <ToastProvider>
        <TestToastComponent />
      </ToastProvider>
    );

    await userEvent.click(screen.getByText("Show Success"));
    await userEvent.click(screen.getByText("Show Error"));
    await userEvent.click(screen.getByText("Show Info"));

    await waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      expect(alerts).toHaveLength(3);
    }, { timeout: 2000 });
  });
});
